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
 * Adds ability to transform server messages into {@link Ext.data.Errors errors}.
 *
 * @author Rocco Bruyn <rocco@smoovz.com>
 */
Ext.define('Smoovz.data.Errors', {
    override: 'Ext.data.Errors',

    uses: [
        'Ext.Object',
        'Ext.String'
    ],

    statics: {
        /**
         * Formats {@link Ext.data.Errors errors} to a string separated by a given string.
         *
         * @param   {Ext.data.Errors} errors
         * @param   {String} [separator="<br>"]
         * @returns {String}
         */
        format: function (errors, separator) {
            var separator = separator || '<br>',
                messages  = [],
                msg;

            errors.each(function (error) {
                msg = Ext.String.format('{0} {1}', error.getField(), error.getMessage());
                messages.push(msg);
            });

            return messages.join(separator);
        },

        /**
         * Transform server messages into {@link Ext.data.Errors errors}.
         *
         * @param   {Object} serverMessages
         * @param   {String} [separator="<br>"]
         * @returns {Ext.data.Errors}
         */
        fromServerMessages: function (serverMessages, separator) {
            var errors    = Ext.create('Ext.data.Errors'),
                separator = separator || '<br>';

            Ext.Object.each(serverMessages, function (field, fieldMessages) {
                errors.add({
                    field: field,
                    message: Ext.Object.getValues(fieldMessages).join(separator)
                });
            });

            return errors;
        }
    }
});