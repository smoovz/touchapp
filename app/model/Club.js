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
 * Model for clubs
 *
 * @author Rocco Bruyn <rocco@smoovz.com>
 */
Ext.define('Smoovz.model.Club', {
    extend: 'Ext.data.Model',
    alias: 'model.club',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.association.HasMany'
    ],

    uses: [
        'Smoovz.model.User',
        'Smoovz.model.Team'
    ],

    config: {
        fields: [{
            name: 'id',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }, {
            name: 'urlFriendlyName',
            type: 'string'
        }, {
            name: 'address',
            type: 'string'
        }, {
            name: 'zipcode',
            type: 'string'
        }, {
            name: 'city',
            type: 'string'
        }, {
            name: 'province',
            type: 'string'
        }, {
            name: 'country',
            type: 'string'
        }, {
            name: 'websiteUrl',
            type: 'string'
        }, {
            name: 'phoneNumber',
            type: 'string'
        }, {
            name: 'gpsLatitude',
            type: 'float'
        }, {
            name: 'gpsLongitude',
            type: 'float'
        }, {
            name: 'foundationDate',
            type: 'date',
            dateFormat: 'timestamp'
        }, {
            name: 'twitterScreenName',
            type: 'string'
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
        },
        hasMany: [{
            instanceName: 'ClubHasManyUserInstance',
            model: 'Smoovz.model.User',
            foreignKey: 'club',
            reader: {
                type: 'json',
                messageProperty: 'message',
                rootProperty: 'data'
            }
        }, {
            instanceName: 'ClubHasManyTeamInstance',
            model: 'Smoovz.model.Team',
            foreignKey: 'club',
            reader: {
                type: 'json',
                messageProperty: 'message',
                rootProperty: 'data'
            }
        }]
    },

    /**
     * Initialize model.
     * Is called from {@link Ext.data.Model#constructor} (gotta love them undocumented features)
     * Sets proxy url.
     *
     * @returns {void}
     */
    init: function () {
        var me = this;

        me.getProxy().setUrl(Config.getApiUrl() + 'club');
    }
});