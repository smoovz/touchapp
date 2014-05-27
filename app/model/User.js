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
 * User model.
 *
 * @author Rocco Bruyn <rocco@smoovz.com>
 */
Ext.define('Smoovz.model.User', {
    extend: 'Ext.data.Model',

    config: {
        fields: [{
            name: 'id',
            type: 'int'
        }, {
            name: 'firstname',
            type: 'string'
        }, {
            name: 'lastname',
            type: 'string'
        }, {
            name: 'emailAddress',
            type: 'string'
        }, {
            name: 'dateOfBirth',
            type: 'date',
            dateFormat: 'timestamp'
        }],

        validations: [{
            field: 'firstname',
            type: 'presence'
        }, {
            field: 'firstname',
            type: 'length',
            min: 2
        }, {
            field: 'lastname',
            type: 'presence'
        }, {
            field: 'firstname',
            type: 'length',
            min: 2
        }, {
            field: 'emailAddress',
            type: 'presence'
        }, {
            field: 'emailAddress',
            type: 'email'
        }, {
            field: 'dateOfBirth',
            type: 'presence'
        }],

        proxy: {
            type: 'rest',
            reader: {
                type: 'json',
                messageProperty: 'message',
                rootProperty: 'data'
            },
            writer: {
                type: 'json'
            }
        }
    },

    /**
     * Creates new User model.
     * Sets proxy url.
     *
     * @constructor
     * @param   {Object} config
     * @returns {void}
     */
    constructor: function(config) {
        var me = this;

        me.callParent([config]);
        me.getProxy().setUrl(Config.getApiUrl() + 'user');
    }
});
