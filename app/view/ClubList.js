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
 * List of clubs.
 *
 * @class  {Smoovz.view.ClubList}
 * @author Rocco Bruyn <rocco@smoovz.com>
 */
Ext.define('Smoovz.view.ClubList', {
    extend: 'Ext.dataview.List',
    alias: 'widget.clublist',

    requires: [
        'Ext.XTemplate'
    ],

    config: {
        disableSelection: true,
        store: 'Club',
        grouped: true,
        striped: true,
        itemTpl: [
            '<div>{name:htmlEncode}</div>'
        ]
    },

    /**
     * Initialize the list.
     * Sets all the localized texts.
     *
     * @returns {void}
     */
    initialize: function () {
        var me = this;

        me.callParent();

        me.setEmptyText(Il8n.translate('_emptyText_'));
        me.setLoadingText(Il8n.translate('loading'));
    }

});