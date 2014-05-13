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
 * @class Smoovz.ux.ajax.JsonSimlet
 * @author Rocco Bruyn <rocco@smoovz.com>
 */
Ext.define('Smoovz.ux.ajax.JsonSimlet', {
    override: 'Ext.ux.ajax.JsonSimlet',

    /**
     * Where to find the data in the response in case we get an object instead of
     * an array from the server.
     * Defaults to 'data'.
     * Set to undefined in case of an array response
     *
     * @cfg {String} rootProperty
     */
    rootProperty: 'data',

    /**
     * Simulates HTTP-POST
     *
     * @param   {Object} ctx
     * @returns {Object}
     */
    doPost: function (ctx) {
        var me = this,
            data = me.getData(ctx),
            page = me.getPage(ctx, data),
            opts = ctx.xhr.options,
            ret = me.callParent(arguments), // pick up status/statusText
            response = {}, reader;

        if (opts.proxy && opts.proxy.reader) {
            reader = opts.proxy.reader;
            response[reader.root] = page;
            response[reader.totalProperty] = data.length;
        } else {
            response = page;
        }

        if (ctx.groupSpec) {
            response.summaryData = me.getSummary(ctx, data, page);
        }

        ret.responseText = Ext.encode(response);
        return ret;
    }
});