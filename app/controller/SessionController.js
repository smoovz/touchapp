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
            teamFinder: 'teamfinder'
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
            },
            'loginform button[itemId=newPasswordBtn]': {
                tap: 'onNewPasswordBtnTap'
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
            success: me.redirectLoggedInUser
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
            success: function () {
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
    
    onNewPasswordBtnTap: function (btn, evt, opts) {
        var me = this;
        
        me.redirectTo('resetpassword');
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
        me.redirectLoggedInUser(user);
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
     * Redirects a logged in user to the main view or the teamselector
     * based on his/her status.
     *
     * @private
     * @param  {Smoovz.model.User} user
     * @return {void}
     */
    redirectLoggedInUser: function(user) {
        var me = this,
            place;

        switch (user.get('status')) {
            case 'complete':
                place = 'main';
            break;

            case 'incomplete':
            default: // we're being conservative
                me.getTeamFinder().setMode('SINGLE');
                place = 'teamselect';
            break;
        }

        me.redirectTo(place);
    }
});
