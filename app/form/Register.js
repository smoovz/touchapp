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

Ext.define('Smoovz.form.Register', {
    extend: 'Ext.form.Panel',
    alias: 'widget.registerform',

    requires: [
        'Ext.Button',
        'Ext.field.Checkbox',
        'Ext.field.DatePicker',
        'Ext.field.Email',
        'Ext.field.Password',
        'Ext.form.FieldSet'
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
            }, {
                xtype: 'passwordfield',
                name: 'pwcheck'
            }, {
                xtype: 'textfield',
                name: 'firstname'
            }, {
                xtype: 'textfield',
                name: 'lastname'
            }, {
                xtype: 'datepickerfield',
                name: 'dateOfBirth'
            }, {
                xtype: 'checkboxfield',
                labelAlign: 'top',
                labelWrap: true
            }]
        }, {
            xtype: 'button',
            itemId: 'registerBtn',
            ui: 'action'
        }]
    },

    initialize: function () {
        var me = this;

        me.callParent();

        me.setUrl(Config.getApiUrl() + 'sessions');
        me.down('titlebar')
            .setTitle(Il8n.translate('register_title_12'));
        me.down('fieldset')
            .setTitle(Il8n.translate('register_text'));
        me.down('emailfield')
            .setLabel(Il8n.translate('email'))
            .setPlaceHolder(Il8n.translate('email_placeholder'));
        me.down('passwordfield[name=password]')
            .setLabel(Il8n.translate('password'));
        me.down('passwordfield[name=pwcheck]')
            .setLabel(Il8n.translate('password'));
        me.down('textfield[name=firstname]')
            .setLabel(Il8n.translate('firstname'));
        me.down('textfield[name=lastname]')
            .setLabel(Il8n.translate('lastname'));
        me.down('datepickerfield')
            .setLabel(Il8n.translate('date_of_birth'));
        me.down('checkboxfield')
            .setLabel(Il8n.translate('accept_terms'));
        me.getComponent('registerBtn')
            .setText(Il8n.translate('register_btn'));
    }
});