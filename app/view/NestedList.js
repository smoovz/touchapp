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


Ext.define('Smoovz.view.NestedList', {
    override: 'Ext.dataview.NestedList',

    /**
     * @inheritdoc
     */
    getList: function (node) {
        var me        = this,
            store     = me.getStore(),
            nodeStore = Ext.create('Ext.data.NodeStore', {
                recursive: false,
                node: node,
                rootVisible: false,
                model: store.getModel(),
                grouper: store.getGrouper(),
                groupField: store.getGroupField()
            });

        node.expand();

        return Ext.Object.merge({
            xtype: 'list',
            useSimpleItems: me.getUseSimpleItems(),
            pressedDelay: 250,
            autoDestroy: true,
            store: nodeStore,
            onItemDisclosure: me.getOnItemDisclosure(),
            allowDeselect: me.getAllowDeselect(),
            itemHeight: me.getItemHeight(),
            variableHeights: me.getVariableHeights(),
            emptyText: me.getEmptyText(),
            listeners: [
                { event: 'itemdoubletap', fn: 'onItemDoubleTap', scope: me },
                { event: 'itemtap', fn: 'onItemInteraction', scope: me, order: 'before'},
                { event: 'itemtouchstart', fn: 'onItemInteraction', scope: me, order: 'before'},
                { event: 'itemtap', fn: 'onItemTap', scope: me },
                { event: 'beforeselectionchange', fn: 'onBeforeSelect', scope: me },
                { event: 'containertap', fn: 'onContainerTap', scope: me },
                { event: 'selectionchange', fn: 'onSelectionChange', order: 'before', scope: me }
            ],
            itemTpl: '<span<tpl if="leaf == true"> class="x-list-item-leaf"</tpl>>' + me.getItemTextTpl(node) + '</span>'
        }, me.getListConfig());
    }

});