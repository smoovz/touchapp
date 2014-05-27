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


Ext.define('Smoovz.controller.MainController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {
        views: [
            'Smoovz.view.Main'
        ],
        routes: {
            main: 'main'
        },
        refs: {
            main: 'main'
        }
    },

    /**
     * Initialize controller.
     * Adds {@link Smoovz.form.LoginForm loginForm} to the viewport.
     *
     * @param   {Ext.Application} app
     * @returns {void}
     */
    init: function (app) {
        Ext.Viewport.add({
            xtype: 'main'
        });
    },

    main: function () {
        var me = this;

        Ext.Viewport.setActiveItem(me.getMain());
    }
});