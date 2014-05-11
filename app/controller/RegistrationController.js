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
 * @class  Smoovz.controller.RegistrationController
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
        views: [
            'Smoovz.form.Register'
        ],
        routes: {
            'register': 'register'
        },
        refs: {
            registerForm: 'registerform'
        },
        control: {
            'registerform button[itemId=registerBtn]': {
                tap: 'onRegisterBtnTap'
            },
            'registerform textfield': {
                change: 'onTextFieldChange'
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
    init: function(app) {
        var me = this;

        me.setValidator(Ext.create('Smoovz.form.validate.Register'));
    },

    /**
     * Register action.
     * Displays the {@link Smoovz.form.Register register} form.
     *
     * @returns {void}
     */
    register: function () {
        var me = this;

        // TODO: check if user is logged in already?

        Ext.Viewport.setActiveItem(me.getRegisterForm());
    },

    /**
     * Event handler for the {@link Ext.Button#event-tap tap} event.
     *
     * @protected
     * @param   {type} btn
     * @param   {type} evt
     * @param   {type} opts
     * @returns {void}
     */
    onRegisterBtnTap: function (btn, evt, opts) {
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
     * @returns {void}
     */
    onRegisterSuccess: function () {
        var me = this;

        console.log('REG SUCCESS');
        console.dir(arguments);
    },

    /**
     * Callback when registration failed.
     *
     * @protected
     * @param   {Ext.form.Register} form
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
     * @param   {Ext.field.Text} The field
     * @param   {Mixed} newValue
     * @param   {Mixed} oldValue
     * @param   {Object} opts
     * @returns {void}
     */
    onTextFieldChange: function (field, newValue, oldValue, opts) {
        var me        = this,
            validator = me.getValidator();

        validator.validateField(field);
    }
});
