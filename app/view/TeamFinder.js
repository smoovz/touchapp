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
    extend: 'Ext.Container',
    alias: 'widget.teamfinder',

    requires: [
        'Ext.Toolbar',
        'Ext.field.Search',
        'Smoovz.view.ClubList',
        'Smoovz.view.TeamList'
    ],

    config: {
        scrollable: 'vertical',
        minSearchChars: 3,
        layout: {
            type: 'card',
            animation: 'slide'
        },
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            items: [{
                xtype: 'button',
                itemId: 'backBtn',
                ui: 'back'
            }, {
                xtype: 'spacer'
            }, {
                xtype: 'searchfield'
            }, {
                xtype: 'spacer'
            }]
        }, {
            xtype: 'clublist',
            itemId: 'clublist'
        }, {
            xtype: 'teamlist',
            itemId: 'teamlist'
        }],
        listeners: [{
            event: 'activeitemchange',
            fn: 'onContainerActiveItemChange'
        }, {
            event: 'keyup',
            fn: 'onSearchfieldKeyup',
            buffer: 500,
            delegate: 'searchfield'
        }, {
            event: 'itemtap',
            fn: 'onClubListItemTap',
            delegate: 'clublist'
        }, {
            event: 'itemtap',
            fn: 'onTeamListItemTap',
            delegate: 'teamlist'
        }, {
            event: 'tap',
            fn: 'onBackBtnTap',
            delegate: 'button[itemId=backBtn]'
        }]
    },

    /**
     * Initialize the form.
     * Adds listeners to stores.
     * Sets all the localized texts.
     *
     * @returns {void}
     */
    initialize: function() {
        var me        = this,
            clubStore = me.getComponent('clublist').getStore(),
            teamStore = me.getComponent('teamlist').getStore(),
            backBtn   = me.down('button[itemId=backBtn]');

        me.callParent();
        clubStore.getProxy().setExtraParam('mode', 'search');
        clubStore.on('load', me.onLoadClubStore, me);
        teamStore.on('load', me.onLoadTeamStore, me);

        backBtn.hide();
        backBtn.setText(Il8n.translate('back'));
    },

    onContainerActiveItemChange: function(container, value, oldValue, eOpts) {
        var me      = this,
            active  = me.getActiveItem(),
            backBtn = me.down('button[itemId=backBtn]');

        switch (active.getItemId()) {
            case 'clublist':
                backBtn.hide();
            break;
            case 'teamlist':
                backBtn.show();
            break;
        }
    },

    onSearchfieldKeyup: function(field, e, eOpts) {
        var me    = this,
            value = field.getValue().trim(),
            active, store;

        if (!value || me.getMinSearchChars() > value.length) {
            return;
        }

        active = me.getActiveItem();
        store  = active.getStore();

        store.clearFilter(!!value);
        switch (active.getItemId()) {
            case 'clublist':
                store.filter('club', value);
                store.filter('city', value);
                store.load({
                    callback: me.onLoadClubStore,
                    scope: me
                });
            break;
            case 'teamlist':
                store.setRemoteFilter(false);
                store.filter('name', value, true);
            break;
        }
    },

    onClubListItemTap: function (list, index, target, record, evt, opts) {
        var me        = this,
            teamStore = me.getComponent('teamlist').getStore();

        teamStore.setRemoteFilter(true);
        teamStore.filter('club', record.get('id'));
        teamStore.load({
            callback: me.onLoadTeamStore,
            scope: me
        });
    },

    onTeamListItemTap: function (list, index, target, record, evt, opts) {

    },

    onBackBtnTap: function (button, evt, opts) {
        var me = this;

        me.getLayout().getAnimation().setReverse(true);
        me.setActiveItem('clublist');
    },

    onLoadClubStore: function (records, operation, success) {
        var me = this;

        me.setActiveItem('clublist');
    },

    onLoadTeamStore: function (records, operation, success) {
        var me = this;

        me.getLayout().getAnimation().setReverse(false);
        me.setActiveItem('teamlist');
    }

});