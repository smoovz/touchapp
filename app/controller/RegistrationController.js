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

Ext.define('Smoovz.controller.RegistrationController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route',
        'Ext.viewport.Viewport',
        'Ext.MessageBox',
        'Smoovz.util.Il8n',
        'Smoovz.form.validate.Register'
    ],

    config: {
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
            }
        }
    },

    //called when the Application is launched, remove if not needed
    launch: function(app) {

    },

    register: function () {
        var me = this;

        // TODO: check if user is logged in already?

        Ext.Viewport.setActiveItem(me.getRegisterForm());
    },

    onRegisterBtnTap: function (btn, evt, opts) {
        var me        = this,
            form      = me.getRegisterForm(),
            validator = Ext.create('Smoovz.form.validate.Register'),
            errors;

        form.clearInvalid();

        errors = validator.validate(form);
        if (!errors.isValid()) {
            Ext.Msg.show({
                title: Il8n.translate('register_fail_title'),
                message: validator.formatErrors(errors),
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

    onRegisterSuccess: function () {
        var me = this;

        console.log('REG SUCCESS');
        console.dir(arguments);
    },

    onRegisterFailure: function () {
        var me = this;

        console.log('REG FAIL');
        console.dir(arguments);
    }
});
