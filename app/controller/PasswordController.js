/*
 * Copyright (C) 2014 Tim Schipper <tim@smoovz.com>
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

Ext.define('Smoovz.controller.PasswordController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route',
        'Ext.viewport.Viewport'
    ],

    config: {
        views: [
            'Smoovz.form.Password'
        ],
        routes: {
            'resetpassword': 'resetpassword'
        },
        refs: {
            passwordForm: 'passwordform'
        },
        control: {
            'passwordform button[itemId=newPasswordBtn]': {
                tap: 'onNewPasswordBtnTap'
            }
        }
    },

    
    init: function(app) {
        Ext.Viewport.add({
            xtype: 'passwordform'
        });
    },
    
    onNewPasswordBtnTap: function (btn, evt, opts) {
        var me = this;

        me.getPasswordForm().submit({
            waitMsg: Il8n.translate('new_password_wait_msg'),
            success: me.onNewPasswordSuccess,
            failure: me.onNewPasswordFailure,
            scope: me
        });
    },
    
    onNewPasswordSuccess: function () {
        var me = this;
        
         Ext.Msg.show({
            title: Il8n.translate('password_email_sent_title'),
            message: messages.join('password_email_sent_text'),
            icon: Ext.Msg.INFO
        });
    },
    
    onNewPasswordFailure: function () {
        var me = this;
        
        Ext.Msg.show({
            title: Il8n.translate('password_fail_title'),
            message: Il8n.translate('password_fail_msg'),
            buttons: [{
                text: Il8n.translate('new_account_btn'),
                itemId: 'newAccountBtn',
                ui: 'confirm'
            }, {
                text: Il8n.translate('try_again_btn'),
                itemId: 'tryAgainBtn',
                ui: 'action'
            }],
            icon: Ext.Msg.WARNING,
            scope: me,
            fn: function (btnId, value, opt) {
                var me = this;
                switch (btnId) {
                    case 'newAccountBtn':
                        me.redirectTo('register');
                        break;
                    case 'tryAgainBtn':
                    default:
                        break;
                }
            }
        });
    },

    resetpassword: function () {
        var me = this;
        // TODO: check if user is logged in already?

        Ext.Viewport.setActiveItem(me.getPasswordForm());
    }
});
