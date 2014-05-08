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


Ext.define('Smoovz.form.validate.Abstract', {

    requires: [
        'Ext.data.Error',
        'Ext.data.Errors',
        'Ext.data.Validations',
        'Ext.form.Panel',
        'Ext.String'
    ],

    config: {
        validations: null
    },

    constructor: function(config) {
        var me = this;

        me.initConfig(config);
        me.callParent([config]);
    },


    validate: function (form, markInvalid) {
        var me          = this,
            data        = form.getValues(),
            errors      = Ext.create('Ext.data.Errors'),
            validations = me.getValidations(),
            validators  = Ext.data.Validations,
            markInvalid = markInvalid || true,
            length, validation, field, valid, value, type, i, query;

        if (validations) {
            length = validations.length;

            for (i = 0; i < length; i++) {
                validation = validations[i];
                field = validation.field || validation.name;
                type  = validation.type;
                value = data[field] || null;
                valid = validators[type](validation, value);

                if (!valid) {
                    errors.add(Ext.create('Ext.data.Error', {
                        field  : field,
                        message: validation.message || validators.getMessage(type)
                    }));
                }
            }

            field = null;
            if (markInvalid) {
                errors.each(function (error) {
                    query = Ext.String.format('field[name={0}]', error.getField());
                    field = form.down(query);
                    if (field) {
                        field.markInvalid();
                    }
                });
            }
        }

        return errors;
    },

    formatErrors: function (errors, separator) {
        var me        = this,
            separator = separator || '<br>',
            messages  = [],
            msg;

        errors.each(function (error) {
            msg = Ext.String.format('{0} {1}', error.getField(), error.getMessage());
            messages.push(msg);
        });

        return messages.join(separator);
    }
});