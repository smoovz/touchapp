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
 * Component to drill-down from Club > Team
 *
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
        /**
         * @cfg {Number} minSearchChars
         * Minimum amount of characters the user needs to type before
         * searching/filtering occurs.
         */
        minSearchChars: 3,
        scrollable: 'vertical',
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
            fn: 'onActiveItemChange'
        }, {
            event: 'keyup',
            fn: 'onSearchFieldKeyup',
            delegate: 'searchfield',
            buffer: 500
        }, {
            event: 'clearicontap',
            fn: 'onSearchFieldClearIconTap',
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

    /**
     * Event hander for when the a different list in the {@link Smoovz.view.TeamFinder teamFinder}
     * becomes {@link #event-activeitemchange active}. Shows or hides the back-button accordingly.
     * Sets {@link #cfg-minSearchChars} accordingly.
     *
     * @protected
     * @param   {Smoovz.view.TeamFinder} teamFinder
     * @param   {Ext.dataview.List} newItem
     * @param   {Ext.dataview.List} oldItem
     * @param   {Object} eOpts
     * @returns {void}
     */
    onActiveItemChange: function(teamFinder, newItem, oldItem, eOpts) {
        var searchField = teamFinder.down('searchfield'),
            backBtn     = teamFinder.down('button[itemId=backBtn]');

        searchField.reset();
        switch (newItem.getItemId()) {
            case 'clublist':
                backBtn.hide();
                teamFinder.setMinSearchChars(3);
            break;
            case 'teamlist':
                backBtn.show();
                teamFinder.setMinSearchChars(2);
            break;
        }
    },

    /**
     * Event handler for when a key is {@link Ext.field.Search#event-keyup released}
     * in the {@link Ext.field.Search searchField}.
     * Filters the active {@link Ext.dataview.List list} if more then, or an equal
     * amount of characters are entered then the configured {@link #cfg-minSearchChars}.
     * If the {@link Smoovz.view.ClubList clubList} is active, it filters remote, otherwise
     * if the {@link Smoovz.view.TeamList teamList} is active it filters local.
     *
     * @protected
     * @param   {Ext.field.Search} field
     * @param   {Ext.event.Event} evt
     * @param   {Object} eOpts
     * @returns {void}
     */
    onSearchFieldKeyup: function(field, evt, eOpts) {
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

    /**
     * Event handler for when the clear-icon is {@link Ext.form.Search#event-clearicontap tapped}.
     * Clears any filters on the active {@link Ext.data.Store}
     *
     * @param   {Ext.field.Search} field
     * @param   {Ext.event.Event} evt
     * @param   {Object} eOpts
     * @returns {void}
     */
    onSearchFieldClearIconTap: function(field, evt, eOpts) {
        var me = this;

        me.getActiveItem().getStore().clearFilter();
    },

    /**
     * Event handler for when a {@link Smoovz.model.Club club} is
     * {@link Smoovz.view.ClubList#event-itemtap tapped}.
     * Loads the {@link Smoovz.model.Team teams} of the
     * {@link Smoovz.view.ClubList#event-itemtap tapped} {@link Smoovz.model.Club club}
     * by loading the corresponding {@link Smoovz.store.Team teamStore}.
     *
     * @protected
     * @param   {Smoovz.view.ClubList} clubList
     * @param   {Number} index
     * @param   {Ext.dataview.component.SimpleListItemView} listItem
     * @param   {Smoovz.model.Club} club
     * @param   {Ext.event.Event} evt
     * @param   {Object} eOpts
     * @returns {void}
     */
    onClubListItemTap: function (clubList, index, listItem, club, evt, eOpts) {
        var me        = this,
            teamStore = me.getComponent('teamlist').getStore();

        teamStore.setRemoteFilter(true);
        teamStore.filter('club', club.get('id'));
        teamStore.load({
            callback: me.onLoadTeamStore,
            scope: me
        });
    },

    /**
     * Event handler for when a {@link Smoovz.model.Team team} is
     * {@link Smoovz.view.TeamList#event-itemtap tapped}.
     * Does nothing at the moment.
     *
     * @protected
     * @param   {Smoovz.view.TeamList} teamList
     * @param   {Number} index
     * @param   {Ext.dataview.component.SimpleListItemView} listItem
     * @param   {Smoovz.model.Team} team
     * @param   {Ext.event.Event} evt
     * @param   {Object} eOpts
     * @returns {void}
     */
    onTeamListItemTap: function (teamList, index, listItem, team, evt, eOpts) {

    },

    /**
     * Event handler for when the {@link Ext.Button back-button} is
     * {@link Ext.Button#event-tap tapped}.
     * Sets the {@link Smoovz.view.ClubList clubList} as active item
     * with the {@link Ext.fx.layout.card.Slide animation} reversed.
     *
     * @protected
     * @param   {Ext.button.Button} button
     * @param   {type} evt
     * @param   {type} eOpts
     * @returns {void}
     */
    onBackBtnTap: function (button, evt, eOpts) {
        var me = this;

        me.getLayout().getAnimation().setReverse(true);
        me.setActiveItem('clublist');
    },

    /**
     * Event handler for when the {@link Smoovz.store.Club clubStore}
     * {@link Smoovz.store.Club#event-load loads}.
     * Sets the {@link Smoovz.view.ClubList clubList} as active item.
     *
     * @protected
     * @param   {Smoovz.model.Club[]} clubs
     * @param   {Ext.data.Operation} operation
     * @param   {Boolean} success
     * @returns {void}
     */
    onLoadClubStore: function (clubs, operation, success) {
        var me = this;

        me.setActiveItem('clublist');
    },

    /**
     * Event handler for when the {@link Smoovz.store.Team teamStore}
     * {@link Smoovz.store.Team#event-load loads}.
     * Sets the {@link Smoovz.view.TeamList teamList} as active item
     * with the {@link Ext.fx.layout.card.Slide animation} reversed.
     *
     * @protected
     * @param   {Smoovz.model.Team[]} teams
     * @param   {Ext.data.Operation} operation
     * @param   {Boolean} success
     * @returns {void}
     */
    onLoadTeamStore: function (teams, operation, success) {
        var me = this;

        me.getLayout().getAnimation().setReverse(false);
        me.setActiveItem('teamlist');
    }
});