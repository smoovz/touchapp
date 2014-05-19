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
 * Component to drill-down from City > Club > Team
 *
 * @class  {Smoovz.view.TeamFinder}
 * @author Rocco Bruyn <rocco@smoovz.com>
 */
Ext.define('Smoovz.view.TeamFinder', {
    extend: 'Ext.dataview.NestedList',
    alias: 'widget.teamfinder',

    requires: [
        'Ext.Toolbar',
        'Ext.field.Search',
        'Smoovz.view.NestedList'
    ],

    config: {
        scrollable: 'vertical',
        backText: '_terug_',
        displayField: 'name',
        emptyText: '_emptyText_',
        loadingText: '_loading_',
        store: 'TeamSelect',
        listConfig: {
            disableSelection: true,
            grouped: true,
//            indexBar: true,
            striped: true
        },
        layout: {
            type: 'card',
            animation: 'slide'
        },
        toolbar: {
            xtype: 'toolbar',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            items: [{
                xtype: 'searchfield'
            }]
        }
    }

});