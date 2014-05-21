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
 * Store used for the drill down to find a team
 *
 * @class  {Smoovz.store.TeamSelect}
 * @author Rocco Bruyn <rocco@smoovz.com>
 */
Ext.define('Smoovz.store.TeamSelect', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.teamselect',

    requires: [
        'Smoovz.model.Club',
        'Smoovz.model.Team',
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json'
    ],

    config: {
        model: 'Smoovz.model.Club',
        storeId: 'TeamSelect',
        defaultRootProperty: 'data',
        proxy: {
            type: 'rest',
            reader: {
                type: 'json',
                messageProperty: 'message',
                rootProperty: 'data'
            }
        },
        root: {
            expanded: true,
            name: 'root',
            data: []
        }
    }
});