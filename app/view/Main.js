Ext.define('Smoovz.view.Main', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.main',

    requires: [
    ],

    config: {
        tabBarPosition: 'bottom',

        items: [{
            title: 'Foo',
            xtype: 'panel',
            items: [{
                xtype: 'button',
                text: 'logout',
                cmd: 'logout'
            }]
        }]
    }
});
