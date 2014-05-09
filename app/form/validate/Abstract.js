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

    uses: [
        'Ext.data.Error',
        'Ext.data.Errors',
        'Ext.data.Validations',
        'Ext.Object',
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

    validateForm: function (form, markInvalid) {
        var me     = this,
            fields = form.getFields(),
            errors = Ext.create('Ext.data.Errors'),
            fieldErrors;

        Ext.Object.each(fields, function (key, field) {
            fieldErrors = me.validateField(field, markInvalid);
            fieldErrors.each(function (error) {
                errors.add(error);
            });
        });

        return errors;
    },

    validateField: function (field, markInvalid) {
        var me          = this,
            fieldName   = field.getName(),
            validations = me.getValidations(),
            validators  = Ext.data.Validations,
            errors      = Ext.create('Ext.data.Errors'),
            markInvalid = markInvalid || true,
            validation, type, valid, i;

        if (validations) {
            for (i = 0; i < validations.length; i++) {
                validation = validations[i];
                if (fieldName !== validation.field &&
                    fieldName !== validation.name) {
                    continue;
                }

                type  = validation.type;
                valid = validators[type](validation, field.getValue());

                if (!valid) {
                    errors.add(Ext.create('Ext.data.Error', {
                        field  : fieldName,
                        message: validation.message || validators.getMessage(type)
                    }));

                    if (markInvalid) {
                        field.markInvalid();
                    }
                } else if (markInvalid) {
                    field.clearInvalid();
                }
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