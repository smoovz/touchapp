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
 * Club store.
 *
 * @class  {Smoovz.store.ClubStore}
 * @author Rocco Bruyn <rocco@smoovz.com>
 */
Ext.define('Smoovz.store.Club', {
    extend: 'Ext.data.Store',
    alias: 'store.club',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Smoovz.model.Club',
        'Smoovz.util.Config'
    ],

    config: {
        groupField: 'city',
        model: 'Smoovz.model.Club',
        remoteFilter: true,
        storeId: 'Club',
        proxy: {
            type: 'rest',
            reader: {
                type: 'json',
                messageProperty: 'message',
                rootProperty: 'data'
            }
        }
    },

    /**
     * Initialize Club store.
     * Sets API url.
     *
     * @returns {void}
     */
     initialize: function() {
         var me = this;

         me.callParent();
         me.getProxy().setUrl(Config.getApiUrl() + 'club');
     }
});