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


Ext.define('Smoovz.field.Field', {
    override: 'Ext.field.Field',

    invalidCls: 'smvz-field-invalid',

    clearInvalid: function () {
        var me = this;
        me.removeCls(me.invalidCls);
    },

    markInvalid: function () {
        var me = this;
        me.addCls(me.invalidCls);
    },

    getInvalidCls: function () {
        var me = this;
        return me.invalidCls;
    },

    setInvalidCls: function (cls) {
        var me = this;

        if (Ext.isString(cls)) {
            me.invalidCls = cls;
        }

        return me;
    }
});