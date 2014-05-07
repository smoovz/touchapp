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

Ext.define('Smoovz.util.Config', {
    alternateClassName: 'Config',
    singleton: true,

    config: {
        apiUrl: 'http://platform.smoovz.dev/apiv2/',
//        apiUrl: 'http://rocco-platform.office.smoovz.com/apiv2/',

        authUser: null
    },

    constructor: function (config) {
        var me = this;

        me.initConfig(config);
        return me;
    }
});