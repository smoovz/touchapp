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


Ext.define('Smoovz.ux.ajax.DataSimlet', {
    override: 'Ext.ux.ajax.DataSimlet',

    getData: function (ctx) {
        var me = this,
            root = me.rootProperty,
            data = (root) ? me.data[root] : me.data,
            params = ctx.params,
            order = (params.group||'')+'-'+(params.sort||'')+'-'+(params.dir||''),
            fields,
            sortFn,
            ret;

        if (order !== '--' && Ext.isArray(data)) {
            ctx.groupSpec = params.group && Ext.decode(params.group);
            if (order == me.currentOrder) {
                return me.sortedData;
            }

            fields = params.sort;
            if (params.dir) {
                fields = [{ direction: params.dir, property: fields }];
            } else {
                fields = Ext.decode(params.sort);
            }

            sortFn = me.makeSortFns((ctx.sortSpec = fields));
            sortFn = me.makeSortFns(ctx.groupSpec, sortFn);

            data = data.slice(0); // preserve 'physical' order of raw data...
            if (sortFn) {
                Ext.Array.sort(data, sortFn);
            }

            me.sortedData = data;
            me.currentOrder = order;
        }

        if (root) {
            ret = me.data;
            me.data[root] = data;
        } else {
            ret = data;
        }

        return ret;
    },

    makeSortFn: function (def, cmp) {
        var order = def.direction,
            sign = (order && order.toUpperCase() == 'DESC') ? -1 : 1;

        return function (leftRec, rightRec) {
            var lhs = leftRec[def.property],
                rhs = rightRec[def.property],
                c = (lhs < rhs) ? -1 : ((rhs < lhs) ? 1 : 0);

            if (c || !cmp) {
                return c * sign;
            }

            return cmp(leftRec, rightRec);
        };
    },

    makeSortFns: function (defs, cmp) {
        for (var sortFn = cmp, i = defs && defs.length; i; ) {
            sortFn = makeSortFn(defs[--i], sortFn);
        }
        return sortFn;
    }
});