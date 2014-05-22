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
 * Team store.
 *
 * @class  {Smoovz.store.ClubStore}
 * @author Rocco Bruyn <rocco@smoovz.com>
 */
Ext.define('Smoovz.store.Team', {
    extend: 'Ext.data.Store',
    alias: 'store.team',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.util.Grouper',
        'Smoovz.model.Team',
        'Smoovz.util.Config',
        'Smoovz.util.Il8n'
    ],

    config: {
        model: 'Smoovz.model.Team',
        remoteFilter: true,
        storeId: 'Team',
        proxy: {
            type: 'rest',
            reader: {
                type: 'json',
                messageProperty: 'message',
                rootProperty: 'data'
            }
        },
        grouper: {
            groupFn: function (record) {
                var trKey = Smoovz.model.Team.ageClassMap[record.get('ageClass')];
                return Il8n.translate(trKey);
            }
        }
    },

    /**
     * Initialize Team store.
     * Sets API url
     *
     * @returns {void}
     */
    initialize: function() {
        var me = this;

        me.callParent();
        me.getProxy().setUrl(Config.getApiUrl() + 'team');
    }
});