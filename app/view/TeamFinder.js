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
        /**
         * @cfg {String} mode
         * Mode of selection.
         * Valid values are: `'SINGLE'` and `'MULTI'`.
         * Maps to {@link Ext.mixin.Selectable#cfg-mode select mode}
         * on {@link Smoovz.view.TeamList teamList}.
         */
        mode: 'MULTI',
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
            }, {
                xtype: 'button',
                itemId: 'okBtn',
                disabled: 'true',
                ui: 'confirm'
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
     * Fires when (a) team(s) is/are selected
     * @event teamselect
     * @param {Smoovz.view.TeamFinder} this The TeamFinder
     * @param {Smoovz.model.Team}/{Smoovz.model.Team[]} team The team or teams that was/were selected
     */

    /**
     * Initialize the form.
     * Adds listeners to stores.
     * Sets all the localized texts.
     * Initially hides Ok/back buttons.
     *
     * @returns {void}
     */
    initialize: function() {
        var me        = this,
            teamList  = me.getComponent('teamlist'),
            teamStore = teamList.getStore(),
            clubStore = me.getComponent('clublist').getStore(),
            backBtn   = me.down('button[itemId=backBtn]'),
            okBtn     = me.down('button[itemId=okBtn]');

        me.callParent();
        clubStore.getProxy().setExtraParam('mode', 'search');
        clubStore.on('load', me.onLoadClubStore, me);
        teamStore.on('load', me.onLoadTeamStore, me);
        teamList.on('selectionchange', me.onTeamListSelectionChange, me);
        teamList.on('select', me.onTeamListSelect, me);

        backBtn.hide();
        backBtn.setText(Il8n.translate('back'));

        okBtn.hide();
        okBtn.setText(Il8n.translate('ok'));
        okBtn.on('tap', me.onOkBtnTap, me);
    },

    /**
     * Destroy the object
     * Unregisters all event handlers
     *
     * @returns {void}
     */
    destroy: function () {
        var me        = this,
            teamList  = me.getComponent('teamlist'),
            teamStore = me.getComponent('teamlist').getStore(),
            clubStore = me.getComponent('clublist').getStore(),
            okBtn     = me.down('button[itemId=okBtn]');

        clubStore.un('load', me.onLoadClubStore, me);
        teamStore.un('load', me.onLoadTeamStore, me);
        teamList.un('selectionchange', me.onTeamListSelectionChange, me);
        teamList.un('select', me.onTeamListSelect, me);
        okBtn.un('tap', me.onOkBtnTap, me);

        me.callParent();
    },

    /**
     * Applies new mode.
     * Checks if new mode is valid, reverts to old mode.
     *
     * @protected
     * @param   {String} newMode
     * @param   {String} oldMode
     * @returns {String}
     */
    applyMode: function (newMode, oldMode) {
        var validModes = ['SINGLE', 'MULTI'];

        return ((0 > validModes.indexOf(newMode.toUpperCase()))
            ? oldMode
            : newMode
        ).toUpperCase();
    },

    /**
     * Maps the new {@link #cfg-mode mode}
     * to {@link Smoovz.view.TeamList#cfg-mode teamList mode}.
     * Sets {@link Smoovz.view.TeamList#cfg-allowDeselect} accordingly.
     * Shows or hides Ok button accordingly.
     *
     * @protected
     * @param   {String} newMode
     * @param   {String} oldMode
     * @returns {String}
     */
    updateMode: function (newMode, oldMode) {
        var me       = this,
            okBtn    = me.down('button[itemId=okBtn]'),
            teamList = me.getComponent('teamlist');

        teamList.setMode(newMode);
        teamList.setAllowDeselect(('MULTI' === newMode));

        okBtn[('MULTI' === newMode) ? 'show' : 'hide']();
    },

    /**
     * Event hander for when the a different list in the {@link Smoovz.view.TeamFinder teamFinder}
     * becomes {@link #event-activeitemchange active}. Shows or hides the back-button accordingly.
     * Sets {@link #cfg-minSearchChars} accordingly.
     * Sets {@link Smoovz.view.TeamList#cfg-allowDeselect} accordingly.
     * Shows/hides Ok/back button accordingly.
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
            backBtn     = teamFinder.down('button[itemId=backBtn]'),
            okBtn       = teamFinder.down('button[itemId=okBtn]');

        searchField.reset();
        switch (newItem.getItemId()) {
            case 'clublist':
                backBtn.hide();
                okBtn.hide();
                teamFinder.setMinSearchChars(3);
            break;
            case 'teamlist':
                backBtn.show();
                okBtn[('MULTI' === teamFinder.getMode()) ? 'show' : 'hide']();
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
     * Clears any filters on the active {@link Ext.data.Store}.
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
    },

    /**
     * Event handler for when the selection on {@link Smoovz.view.TeamList teamList} changes.
     * Enables/disables Ok button accordingly.
     *
     * Note: somehow the 2nd param only gives the last selected instead of an array
     * with the entire selection, contrary to what {@link Smoovz.view.TeamList#event-selectionchange} says.
     *
     * @protected
     * @param   {Smoovz.view.TeamList} teamList
     * @param   {Smoovz.model.Team[]} teams
     * @param   {type} eOpts
     * @returns {void}
     */
    onTeamListSelectionChange: function (teamList, teams, eOpts) {
        var me    = this,
            okBtn = me.down('button[itemId=okBtn]');

        okBtn[(0 < teamList.getSelectionCount()) ? 'enable' : 'disable']();
    },

    /**
     * Event handler for when a single team is {@link Smoovz.view.TeamList#event-select selected}
     * from the {@link Smoovz.view.TeamList teamList}.
     * Acts as a relay, fires {@link #event-teamselect teamselect} event
     * if {@link #cfg-mode mode} is 'SINGLE'.
     *
     * @protected
     * @param   {Smoovz.view.TeamList} teamList
     * @param   {Smoovz.model.Team} team
     * @param   {Object} eOpts
     * @returns {void}
     */
    onTeamListSelect: function (teamList, team, eOpts) {
        var me = this;

        if ('SINGLE' === me.getMode()) {
            me.fireEvent('teamselect', me, team);
        }
    },

    /**
     * Event handler for when the Ok button is {@link Ext.Button#event-tap tapped}.
     * Acts as a relay, fires {@link #event-teamselect teamselect} event
     * if {@link #cfg-mode mode} is 'MULTI'.
     *
     * @protected
     * @param   {Ext.Button} button
     * @param   {Ext.event.Event} evt
     * @param   {Object} eOpts
     * @returns {void}
     */
    onOkBtnTap: function (button, evt, eOpts) {
        var me = this;

        if ('MULTI' === me.getMode()) {
            me.fireEvent('teamselect', me, me.getComponent('teamlist').getSelection());
        }
    }
});