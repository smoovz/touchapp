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
            'Club',
            'Team'
        ],
        stores: [
            'Club',
            'Team'
        ],
        views: [
            'TeamFinder'
        ],
        routes: {
            'teamselect': 'showFinder'
        },
        refs: {
            teamFinder: 'teamfinder'
        }
    },

    /**
     * Show finder action.
     * Displays the {@link Smoovz.view.TeamFinder}.
     *
     * @returns {void}
     */
    showFinder: function() {
        var me         = this,
            teamFinder = me.getTeamFinder();

        Ext.Viewport.setActiveItem(teamFinder);
    }

});