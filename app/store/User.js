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
 * User store.
 *
 * @class Smoovz.store.User
 * @author Rocco Bruyn <rocco@smoovz.com>
 */
Ext.define('Smoovz.store.User', {
    extend: 'Ext.data.Store',
    alias: 'store.userstore',

    requires: [
        'Smoovz.model.User',
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],

    config: {
        model: 'Smoovz.model.User',
        storeId: 'User',
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
     * Creates new User store.
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