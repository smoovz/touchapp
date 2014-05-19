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
 * From to register new users.
 *
 * @class Smoovz.form.Register
 * @author Rocco Bruyn <rocco@smoovz.com>
 */
Ext.define('Smoovz.form.Register', {
    extend: 'Ext.form.Panel',
    alias: 'widget.registerform',

    requires: [
        'Ext.Button',
        'Ext.Date',
        'Ext.field.Checkbox',
        'Ext.field.DatePicker',
        'Ext.field.Email',
        'Ext.field.Password',
        'Ext.form.FieldSet',
        'Ext.TitleBar',
        'Smoovz.form.Panel',
        'Smoovz.field.Field',
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
                name: 'emailAddress',
                required: true
            }, {
                xtype: 'passwordfield',
                name: 'password',
                required: true
            }, {
                xtype: 'passwordfield',
                name: 'passwordConfirm',
                required: true
            }, {
                xtype: 'textfield',
                name: 'firstname',
                required: true
            }, {
                xtype: 'textfield',
                name: 'lastname',
                required: true
            }, {
                xtype: 'datepickerfield',
                name: 'dateOfBirth',
                required: true,
                picker: {
                    yearFrom: 1900,
                    value: Ext.Date.add(new Date(), Ext.Date.YEAR, -18),
                    doneButton: {
                        itemId: 'doneBtn'
                    }
                }
            }, {
                xtype: 'checkboxfield',
                name: 'agreedToEULAAt',
                labelAlign: 'top',
                labelWrap: true,
                required: true,
                value: Ext.Date.format(new Date(), 'U')
            }]
        }, {
            xtype: 'button',
            itemId: 'registerBtn',
            ui: 'action'
        }],
        listeners: [{
            event: 'beforesubmit',
            fn: 'onBeforeSubmit'
        }]
    },

    /**
     * Initialize the form.
     * Sets all the localized texts.
     *
     * @returns {void}
     */
    initialize: function () {
        var me = this;

        me.callParent();

        me.setUrl(Config.getApiUrl() + 'user');
        me.down('titlebar')
            .setTitle(Il8n.translate('register_title_12'));
        me.down('fieldset')
            .setTitle(Il8n.translate('register_text'));
        me.down('emailfield')
            .setLabel(Il8n.translate('email'))
            .setPlaceHolder(Il8n.translate('email_placeholder'));
        me.down('passwordfield[name=password]')
            .setLabel(Il8n.translate('password'));
        me.down('passwordfield[name=passwordConfirm]')
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
    },

    /**
     * Event handler for form submission.
     * Transforms dateOfBirth to unix timestamp.
     *
     * See [the forum](http://www.sencha.com/forum/showthread.php?160553-Alter-form-data-using-the-beforesubmit-event).
     *
     * @protected
     * @param   {Smoovz.form.Register} form
     * @param   {Object} values
     * @param   {Object} opts
     * @param   {Ext.event.Event} evt
     * @param   {Object} eOpts
     * @returns {void}
     */
    onBeforeSubmit: function (form, values, opts, evt, eOpts) {
        var timestamp = Ext.Date.format(values.dateOfBirth, 'U');

        // setting the value on 'values' doesn't work so we do it on the (DOM) form
        Ext.fly(opts.form).down('input[name=dateOfBirth]', true).value = timestamp;
    }
});