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
 * Form used for signing in users
 *
 * @class Smoovz.form.Login
 * @author Rocco Bruyn <rocco@smoovz.com>
 */
Ext.define('Smoovz.form.Login', {
    extend: 'Ext.form.Panel',
    alias: 'widget.loginform',

    requires: [
        'Ext.Button',
        'Ext.field.Email',
        'Ext.field.Password',
        'Ext.form.FieldSet',
        'Ext.TitleBar',
        'Smoovz.util.Config',
        'Smoovz.util.Il8n'
    ],

    config: {
        layout: {
            type: 'vbox',
            align: 'center'
        },
        items: [{
            xtype: 'titlebar',
            docked: 'top'
        }, {
            xtype: 'fieldset',
            width: '90%',
            items: [{
                xtype: 'emailfield',
                name: 'email'
            }, {
                xtype: 'passwordfield',
                name: 'password'
            }]
        }, {
            xtype: 'button',
            itemId: 'signInBtn',
            ui: 'action'
        }, {
            xtype: 'component',
            itemId: 'lostpass',
            margin: '50 0 5 0'
        }, {
            xtype: 'button',
            itemId: 'newPasswordBtn',
            ui: 'confirm'
        }, {
            xtype: 'component',
            itemId: 'noaccount',
            margin: '50 0 5 0'
        }, {
            xtype: 'button',
            itemId: 'newAccountBtn',
            ui: 'confirm'
        }]
    },

    /**
     * Initialize the form
     * Sets all the localized texts
     *
     * @returns {void}
     */
    initialize: function () {
        var me = this;

        me.callParent();

        me.setUrl(Config.getApiUrl() + 'sessions');
        me.down('titlebar')
            .setTitle(Il8n.translate('sign_in_title'));
        me.down('fieldset')
            .setTitle(Il8n.translate('sign_in_text'));
        me.down('emailfield')
            .setLabel(Il8n.translate('email'))
            .setPlaceHolder(Il8n.translate('email_placeholder'));
        me.down('passwordfield')
            .setLabel(Il8n.translate('password'));
        me.getComponent('signInBtn')
            .setText(Il8n.translate('sign_in_btn_text'));
        me.getComponent('lostpass')
            .setHtml(Il8n.translate('lost_password'));
        me.getComponent('newPasswordBtn')
            .setText(Il8n.translate('new_password_btn'));
        me.getComponent('noaccount')
            .setHtml(Il8n.translate('no_account_yet'));
        me.getComponent('newAccountBtn')
            .setText(Il8n.translate('new_account_btn'));
    }

});