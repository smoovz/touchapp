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
 * Controller that handles registration proccess.
 *
 * @author Rocco Bruyn <rocco@smoovz.com>
 */
Ext.define('Smoovz.controller.RegistrationController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route',
        'Smoovz.data.Errors',
        'Smoovz.form.validate.Register'
    ],

    uses: [
        'Ext.data.Error',
        'Ext.data.Errors',
        'Ext.MessageBox',
        'Ext.viewport.Viewport',
        'Smoovz.util.Il8n'
    ],

    config: {
        /**
         * @cfg {Smoovz.form.validate.Abstract} validator
         * A validator class to validate the {@link Smoovz.form.Register form}.
         */
        validator: null,
        /**
         * @cfg {Smoovz.model.User} regUser
         * User that is currently being registered
         */
        regUser: null,
        stores: [
            'Smoovz.store.Registration'
        ],
        views: [
            'Smoovz.form.Register',
            'Smoovz.view.TeamFinder'
        ],
        before: {
            register: 'beforeRegister'
        },
        routes: {
            register: 'register'
        },
        refs: {
            registerForm: 'registerform',
            teamFinder: 'teamfinder'
        },
        control: {
            'registerform button[itemId=registerBtn]': {
                tap: 'onRegisterBtnTap'
            },
            'registerform textfield': {
                change: 'onTextFieldChange'
            },
            teamfinder: {
                teamselect: 'onTeamFinderSelect'
            }
        }
    },

    /**
     * Initialize controller.
     * Creates {@link Smoovz.form.validate.Register validator}.
     *
     * @param   {Ext.Application} app
     * @returns {void}
     */
    init: function (app) {
        var me = this;

        me.setValidator(Ext.create('Smoovz.form.validate.Register'));
    },

    /**
     * Is exectuted before {@link #register}.
     * Checks if the user is already logged in.
     * Redirects to main view if this is the case.
     * Checks if registration is already in progress.
     * Redirects to teamselect if this is the case.
     *
     * @param   {Ext.app.Action} action
     * @returns {void}
     */
    beforeRegister: function (action) {
        var me       = this,
            loggedin = false,    // stub
            application, teamFinder, store, count, user;

        if (true === loggedin) {
            // TODO: check if user is logged in already
            return;
        } else {
            store = Ext.StoreMgr.lookup('Registration');
            count = store.getCount();
            user;

            switch (true) {
                case (0 === count): // nothing saved
                break;
                case (1 === count): // register in progress
                    application = action.getApplication();
                    user        = store.getAt(0);
                    teamFinder  = me.getTeamFinder();

                    me.setRegUser(user);
                    teamFinder.setMode('SINGLE');

                    action.setController(application.getController('TeamSelectController'));
                    action.setAction('showFinder');
                    action.setUrl('teamselect');
                    application.getHistory().add(action, true);
                break;
                case (1 < count): // ambiguous
                default:
                    me.setRegUser(null);
                    store.removeAll();
                    store.sync();
                break;
            }
        }

        action.resume();
    },

    /**
     * Register action.
     * Displays the {@link Smoovz.form.Register register} form.
     *
     * @returns {void}
     */
    register: function () {
        var me = this;

        Ext.Viewport.setActiveItem(me.getRegisterForm());
    },

    /**
     * Event handler for the {@link Ext.Button#event-tap tap} event.
     * Clears invalid fields, then {@link Smoovz.form.validate.Register#validateForm validates} again,
     * {@link Smoovz.form.Register#markInvalid marking the invalid} fields (again).
     * Display messages if {@link Smoovz.form.validate.Register#validateForm validates} fails.
     * Submits {@link Smoovz.form.Registe form} otherwise.
     *
     * @protected
     * @param   {Ext.Button} btn
     * @param   {Ext.event.Event} evt
     * @param   {Object} eOpts
     * @returns {void}
     */
    onRegisterBtnTap: function (btn, evt, eOpts) {
        var me        = this,
            form      = me.getRegisterForm(),
            validator = me.getValidator(),
            errors, values, pass, passConfirm;

        form.clearInvalid();

        errors = validator.validateForm(form);
        values = form.getValues();
        if (values.password !== values.passwordConfirm) {
            errors.add(Ext.create('Ext.data.Error', {
                field  : 'passwordConfirm',
                message: Il8n.translate('password_no_match')
            }));
        }

        if (!errors.isValid()) {
            Ext.Msg.show({
                title: Il8n.translate('register_fail_title'),
                message: Ext.data.Errors.format(errors),
                icon: Ext.MessageBox.WARNING
            });
            return;
        }

        me.getRegisterForm().submit({
            waitMsg: Il8n.translate('register_wait_msg'),
            success: me.onRegisterSuccess,
            failure: me.onRegisterFailure,
            scope: me
        });
    },

    /**
     * Callback when registration was successful.
     *
     * @protected
     * @param   {Smoovz.form.Register} form
     * @param   {Object} result
     * @param   {String} response
     * @returns {void}
     */
    onRegisterSuccess: function (form, result, response) {
        var me     = this,
            rd    = result.data,
            store = Ext.StoreMgr.lookup('Registration'),
            user  = Ext.create('Smoovz.model.User', {
                id: rd.id,
                firstname: rd.firstname,
                lastname: rd.lastname,
                emailAddress: rd.emailAddress,
                dateOfBirth: rd.dateOfBirth
            });

        me.setRegUser(user);

        // we have to set the model 'dirty' because it got an ID from the server,
        // otherwise it's not saved to the localstorage
        user.setDirty();
        store.add(user);

        // we alse have to call sync manually because even though we've set the
        // model to 'dirty', is't still not 'phantom' which needs to be the case
        // for the autosync to kick in
        store.sync();

        me.redirectTo('teamselect');
    },

    /**
     * Callback when registration failed.
     * Displays error message(s).
     *
     * @protected
     * @param   {Smoovz.form.Register} form
     * @param   {Object} result
     * @returns {void}
     */
    onRegisterFailure: function (form, result) {
        var me     = this,
            errors = Ext.data.Errors.fromServerMessages(result.message);

        form.markInvalid(errors);
        Ext.Msg.show({
            title: Il8n.translate('register_fail_title'),
            message: Ext.data.Errors.format(errors),
            icon: Ext.MessageBox.WARNING
        });
    },

    /**
     * Event handler for {@link Ext.field.Text textfield} {@link Ext.field.Text#event-change change}.
     * Validates the field.
     *
     * @protected
     * @param   {Ext.field.Text} field
     * @param   {Mixed} newValue
     * @param   {Mixed} oldValue
     * @param   {Object} eOpts
     * @returns {void}
     */
    onTextFieldChange: function (field, newValue, oldValue, eOpts) {
        var me        = this,
            validator = me.getValidator();

        validator.validateField(field);
    },

    /**
     * Event handler for when a {@link Smoovz.model.Team team} is selected.
     *
     * @protected
     * @param   {Smoovz.view.TeamFinder} teamFinder
     * @param   {Smoovz.model.Team} team
     * @returns {void}
     */
    onTeamFinderSelect: function (teamFinder, team) {
        var me   = this,
            user = me.getRegUser(),
            store;

        if (!user) {
            return;
        }

        store = Ext.StoreMgr.lookup('Registration');
        // The team was not loaded by association, but by a seperate store that
        // doesn't know about associations. Therefore we need to reload te club.
        team.getClub({
            reload: true,
            success: function (club) {
                user.setClub(club);
                user.setTeam(team);

                me.setRegUser(null);
                store.remove(user);
                store.sync();
            }
        });
    }
});
