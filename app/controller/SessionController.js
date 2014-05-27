/*
 * Copyright (C) 2014 Rocco Bruyn <rocco@smoovz.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Controller that handles authentication.
 *
 * @author Rocco Bruyn <rocco@smoovz.com>
 */
Ext.define('Smoovz.controller.SessionController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    uses: [
        'Ext.Ajax',
        'Ext.MessageBox',
        'Ext.String',
        'Ext.viewport.Viewport'
    ],

    config: {
        models: [
            'Smoovz.model.User'
        ],
        views: [
            'Smoovz.form.Login'
        ],
        before: {
            login: 'beforeLogin'
        },
        routes: {
            login: 'login',
            logout: 'logout'
        },
        refs: {
            loginForm: 'loginform',
            teamFinder: 'teamFinder'
        },
        control: {
            'loginform button[itemId=signInBtn]': {
                tap: 'onLoginBtnTap'
            },
            'button[cmd=logout]': {
                tap: 'onLogoutBtnTap'
            },
            'loginform button[itemId=newAccountBtn]': {
                tap: 'onNewAccountBtnTap'
            }
        }
    },

    /**
     * Initialize controller.
     * Adds {@link Smoovz.form.LoginForm loginForm} to the viewport.
     *
     * @param   {Ext.Application} app
     * @returns {void}
     */
    init: function (app) {
        Ext.Viewport.add({
            xtype: 'loginform'
        });
    },

    /**
     * Application launch.
     * Register global Ajax listener to check for HTTP 401, 403, 500 etc.
     * @todo refactor to separate class (single responsibility and whatnot..).
     *
     * @param   {Ext.Application} app
     * @returns {void}
     */
    launch: function(app) {
        var me = this;

        Ext.Ajax.on({
            requestcomplete: me.onRequestComplete,
            requestexception: me.onRequestException
        });
    },

    /**
     * Is exectuted before {@link #login}.
     * Checks if the user is already logged in.
     * Redirects to main view if this is the case.
     *
     * @param   {Ext.app.Action} action
     * @returns {void}
     */
    beforeLogin: function (action) {
        var me = this;

        Auth.check({
            scope: me,
            success: function (user) {
                var me = this;
                me.redirectTo('main');
            }
        });

        action.resume();
    },

    /**
     * Login action.
     * Displays {@link Smoovz.form.Login login} form.
     *
     * @returns {void}
     */
    login: function () {
        var me = this;

        Ext.Viewport.setActiveItem(me.getLoginForm());
    },

    /**
     * Logout action.
     * Logs out user, then redirects to {@link #login login}.
     *
     * @todo Destroy session
     *
     * @returns {void}
     */
    logout: function () {
        var me = this;

        Auth.logout({
            scope: me,
            success: function (user) {
                var me = this;
                me.redirectTo('login');
            }
        });
    },

    /**
     * Event handler for when 'new account' button is tapped.
     * Redirects to {@link Smoovz.controller.RegistrationCont.roller#register register}.
     *
     * @protected
     * @param   {Ext.Button} btn
     * @param   {Ext.event.Event} evt
     * @param   {Object} eOpts
     * @returns {void}
     */
    onNewAccountBtnTap: function (btn, evt, eOpts) {
        var me = this;

        me.redirectTo('register');
    },

    /**
     * Event handler for when 'logout' button is tapped.
     * Redirects to {@link #logout logout}.
     *
     * @protected
     * @param   {Ext.Button} btn
     * @param   {Ext.event.Event} evt
     * @param   {Object} eOpts
     * @returns {void}
     */
    onLogoutBtnTap: function (btn, evt, eOpts) {
        var me = this;

        me.redirectTo('logout');
    },

    /**
     * Event handler for when 'login' button is tapped.
     * Submits {@link Smoovz.form.Login login} form.
     *
     * @protected
     * @param   {Ext.Button} btn
     * @param   {Ext.event.Event} evt
     * @param   {Object} eOpts
     * @returns {void}
     */
    onLoginBtnTap: function (btn, evt, eOpts) {
        var me = this;

        me.getLoginForm().submit({
            waitMsg: Il8n.translate('sign_in_wait_msg'),
            success: me.onLoginSuccess,
            failure: me.onLoginFailure,
            scope: me,
            withCredentials: true
        });
    },

    /**
     * Callback for when login was successfull.
     * Creates a new {@link Smoovz.model.User user} based on result.
     * Saves newly created {@link Smoovz.model.User user} in the
     * {@link Smoovz.util.Config config} as {@link Smoovz.util.Config#authUser authUser}.
     * Displays error if creation failed.
     *
     * @protected
     * @param   {Smoovz.form.Login} form
     * @param   {Object} result The result object returned by the server as a result of the submit request
     * @param   {Object} data The parsed data returned by the server
     * @returns {void}
     */
    onLoginSuccess: function (form, result, data) {
        var me       = this,
            messages = [],
            rd       = result.data,
            user     = Ext.create('Smoovz.model.User', {
                id: rd.id,
                firstname: rd.firstname,
                lastname: rd.lastname,
                emailAddress: rd.emailAddress,
                dateOfBirth: rd.dateOfBirth,
                status: rd.status
            }), errors, msg, nextView;

        errors = user.validate();
        if (!errors.isValid()) {
            errors.each(function (err) {
                msg = Ext.String.format('{0} {1}', err.getField(), err.getMessage());
                messages.push(msg);
            }, me);

            Ext.Msg.show({
                title: Il8n.translate('sign_in_fail_error_create_user_title'),
                message: messages.join('<br>'),
                icon: Ext.MessageBox.ERROR
            });
            return;
        }

        Auth.setUser(user);
        switch (user.get('status')) {
            case 'complete':
                nextView = 'main';
            break;

            case 'incomplete':
            default: // conservative
                me.getTeamFinder().setMode('SINGLE');
                nextView = 'teamfinder';
            break;
        }

        Ext.Viewport.setActiveItem(nextView);
    },

    /**
     * Callback for when login failed.
     * Displays error messages.
     *
     * @protected
     * @param   {Smoovz.form.Login} form
     * @param   {Object} result
     * @returns {void}
     */
    onLoginFailure: function (form, result) {
        var me = this;

        Ext.Msg.show({
            title: Il8n.translate('sign_in_fail_title'),
            message: Il8n.translate('sign_in_fail_msg'),
//            buttons: [{
//                text: Il8n.translate('try_again_btn'),
//                itemId: 'tryAgainBtn',
//                ui: 'action'
//            }, {
//                text: Il8n.translate('new_account_btn'),
//                itemId: 'newAccountBtn',
//                ui: 'confirm'
//            }],
            icon: Ext.Msg.WARNING,
            scope: me,
            fn: function (btnId, value, opt) {
                switch (btnId) {
                    case 'newPasswordBtn':
                        console.log('NEW PASS');
                        break;
                    case 'tryAgainBtn':
                    default:
                        console.log('if at first you don\'t succeed..');
                        break;
                }
            }
        });
    },

    /**
     * Event handler for all xhr-requests that are completed.
     * Checks for [HTTP Status Codes](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes).
     * @todo refactor to separate class (single responsibility and whatnot..).
     *
     * @protected
     * @param   {Ext.data.Connection} conn The connection object
     * @param   {Object} response The [XHR](http://www.w3.org/TR/XMLHttpRequest) object containing the response data
     * @param   {Object} opts The options config object passed to the {@link Ext.Ajax#request request} method
     * @param   {Object} eOpts The options object passed to {@link Ext.util.Observable#addListener addListener}
     * @returns {void}
     */
    onRequestComplete: function (conn, response, opts, eOpts) {
        var me = this;

        switch (response.status) {
            case 200:   // OK
            default:
                break;

            case 401:   // Unauthorized
                me.redirectTo('login');
                break;
            case 403:   // Forbidden
                break;
        }
    },

    /**
     * Event handler for all xhr-requests that are completed.
     * Checks for [HTTP Status Codes](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes).
     * @todo refactor to separate class (single responsibility and whatnot..).
     *
     * @param   {Ext.data.Connection} conn The connection object
     * @param   {Object} response The [XHR](http://www.w3.org/TR/XMLHttpRequest) object containing the response data
     * @param   {Object} opts The options config object passed to the {@link Ext.Ajax#request request} method
     * @param   {Object} eOpts The options object passed to {@link Ext.util.Observable#addListener addListener}
     * @returns {void}
     */
    onRequestException: function (conn, response, opts, eOpts) {
        console.log('request exception');
    }
});
