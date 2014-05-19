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
 * Controller that handles finding teams using the drill down
 *
 * @class  {Smoovz.controller.TeamSelectController}
 * @author Rocco Bruyn <rocco@smoovz.com>
 */
Ext.define('Smoovz.controller.TeamSelectController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {
        models: [
            'Club'
        ],
        stores: [
            'TeamSelect'
        ],
        views: [
            'TeamFinder'
        ],
        routes: {
            'teamselect': 'showFinder'
        },

        refs: {
            teamFinder: 'teamfinder'
        },
        control: {
            'teamfinder': {
                itemtap: 'onItemTap'
            },
            'teamfinder searchfield': {
                keyup: 'onSearchKeyUp'
            }
        }
    },

    showFinder: function() {
        var me = this,
            tf = me.getTeamFinder(),
            ai;

        tf.setActiveItem(0);
//        ai = tf.getActiveItem();
//        ai.getStore().


//        tf.getStore().load();
        Ext.Viewport.setActiveItem(tf);
    },

    onItemTap: function(nestedlist, list, index, target, record, evt, opts) {
        console.log(record.get('name'));

        evt.stopEvent();
        return false;
    },

    onSearchKeyUp: function (field, evt, opts) {
        var me    = this,
            store = me.getTeamFinder().getStore(),
            value = field.getValue().trim(),
            expr, regex;

        store.clearFilter(!!value);
        if (!value || 3 >= value.length) {
            return;
        }

        expr = value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
console.log('FILTER');
        store.setRemoteFilter(true);
        store.filter('name', expr, true);

//        regex = new RegExp(expr, 'i');
//        store.filter(function (record) {
//            if (regex.test(record.get('name'))) {
//                console.log('matches');
//                return true;
//            } else {
//                console.log('not matches');
//                return false;
//            }
//        });
    }

});