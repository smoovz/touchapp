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
 * Add the ability to mark a field as invalid
 *
 * @class Smoovz.field.Field
 * @author Rocco Bruyn <rocco@smoovz.com>
 */
Ext.define('Smoovz.field.Field', {
    override: 'Ext.field.Field',

    /**
     * @cfg {String} invalidCls
     * css-class to add when field is marked invalid
     */
    invalidCls: 'smvz-field-invalid',

    /**
     * Clear the field of invalid status
     * Removes the {@link #invalidCls} css-class
     *
     * @returns {void}
     */
    clearInvalid: function () {
        var me = this;
        me.removeCls(me.invalidCls);
    },

    /**
     * Mark the field as invalid
     * Adds the {@link #invalidCls} css-class
     *
     * @returns {void}
     */
    markInvalid: function () {
        var me = this;
        me.addCls(me.invalidCls);
    },

    /**
     * Get the value of {@link #invalidCls}
     *
     * @return {String}
     */
    getInvalidCls: function () {
        var me = this;
        return me.invalidCls;
    },

    /**
     * Set the value of {@link #invalidCls}
     *
     * @chainable
     * @param {String} cls
     * @return {Smoovz.field.Field} Provides fluent interface
     */
    setInvalidCls: function (cls) {
        var me = this;

        if (Ext.isString(cls)) {
            me.invalidCls = cls;
        }

        return me;
    }
});