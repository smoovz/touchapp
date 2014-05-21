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
        'Smoovz.model.Club',
        'Smoovz.model.Team',
        'Smoovz.util.Config',
        'Smoovz.util.Il8n',
        'Smoovz.view.NestedList'
    ],

    statics: {
        modes: ['club', 'team']
    },

    config: {
        scrollable: 'vertical',
        backText: '_terug_',
        emptyText: '_emptyText_',
        loadingText: '_loading_',
        store: 'TeamSelect',
        mode: null,
        listConfig: {
            disableSelection: true,
            striped: true,
            grouper: null,
            itemTpl: [
                '<div>{name:htmlEncode}</div>'
            ]
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
    },

    /**
     * Finds the index of the active item
     *
     * @returns {Number} The index of the active item
     */
    getActiveIndex: function() {
        var me     = this,
            active = me.getActiveItem();

        return me.getItems().findIndexBy(function (o, k) {
            return active === o;
        });
    },

    /**
     * Applies the mode
     * Checks if mode is known, otherwise revert to old (current) one
     *
     * @param   {String} newMode
     * @param   {String} oldMode
     * @returns {String}
     */
    applyMode: function (newMode, oldMode) {
        var me = this;
        return (0 > me.statics().modes.indexOf(newMode))
            ? oldMode
            : newMode;
    },

    /**
     *
     * @param   {String} newMode
     * @param   {String} oldMode
     * @returns {void}
     */
    updateMode: function (newMode, oldMode) {
        var me     = this,
            store  = me.getStore(),
            proxy  = store.getProxy(),
            active, activeStore, activeGrouped, activeGroupField,
            storeModel, storeNodeParam, storeRemoteFilter, storeGrouper,
            proxyUrl, proxyExtraParams;

        switch (newMode) {
            case 'club':
//                me.setActiveItem(0);

                activeGrouped    = true;
                activeGroupField = 'city';

                storeModel        = 'Smoovz.model.Club';
                storeNodeParam    = 'node';
                storeRemoteFilter = true;
                storeGrouper      = null;

                proxyUrl         = 'club';
                proxyExtraParams = {
                    mode: 'search'
                };
            break;

            case 'team':
//                me.setActiveItem(1);

                activeGrouped    = true;
                activeGroupField = 'ageClass';

                storeModel        = 'Smoovz.model.Team';
                storeNodeParam    = 'club';
                storeRemoteFilter = false;
                storeGrouper      = {
                    groupFn: me.teamGroupFn
                };

                proxyUrl         = 'team';
                proxyExtraParams = null;
            break;
        }

        active = me.getActiveItem();
        active.setGrouped(activeGrouped);
        active.getStore().setGroupField(activeGroupField);

        store.setModel(storeModel);
        store.setNodeParam(storeNodeParam);
        store.setRemoteFilter(storeRemoteFilter);
        store.setGrouper(storeGrouper);

        proxy.setExtraParams(proxyExtraParams);
        proxy.setUrl(Config.getApiUrl() + proxyUrl);
    },


    /**
     * Translates ageClass into localized, human-readable value for grouping
     *
     * @private
     * @param   {Smoovz.model.Team} record
     * @returns {String}
     */
    teamGroupFn: function (record) {
        var trKey = Smoovz.model.Team.ageClassMap[record.get('ageClass')];
        return Il8n.translate(trKey);
    }

});