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
 * Implements HTTP-POST simulation
 *
 * @class Smoovz.ux.ajax.Simlet
 * @author Rocco Bruyn <rocco@smoovz.com>
 */
Ext.define('Smoovz.ux.ajax.Simlet', {
    override: 'Ext.ux.ajax.Simlet',

    /**
     * Simulate HTTP-POST.
     * Proxies to {@link #doGet}
     *
     * @param   {Object} ctx
     * @returns {Object}
     */
    doPost: function (ctx) {
        var me = this,
            ret = {};

        Ext.each(me.responseProps, function (prop) {
            if (prop in me) {
                ret[prop] = me[prop];
            }
        });

        return ret;
    }
});