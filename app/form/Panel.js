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
 * Add the ability to clear all fields from the invalid status.
 * Fixes a bug in ST which prevents you from adjusting form values prior to submit.
 * See [the forum](http://www.sencha.com/forum/showthread.php?160553-Alter-form-data-using-the-beforesubmit-event).
 *
 * @class Smoovz.form.Panel
 * @author Rocco Bruyn <rocco@smoovz.com>
 */
Ext.define('Smoovz.form.Panel', {
    override: 'Ext.form.Panel',

    uses: [
        'Ext.Object'
    ],

    /**
     * Clear all fields from the invalid status.
     *
     * @returns {void}
     */
    clearInvalid: function () {
        var me     = this,
            fields = me.getFields();

        Ext.Object.each(fields, function (name, field) {
            field.clearInvalid();
        });
    },

    /**
     * Marks fields as invalid based on an {@link Ext.data.Errors errors} object.
     *
     * @param   {Ext.data.Errors} errors
     * @returns {void}
     */
    markInvalid: function (errors) {
        var me     = this,
            fields = me.getFields(),
            fieldName;

        errors.each(function (error) {
            fieldName = error.getField();
            Ext.Object.each(fields, function (name, field) {
                if (fieldName === name) {
                    field.markInvalid();
                }
            });
        });
    },

    /**
     * @inheritdoc
     */
    submit: function(options, e) {
        var me = this,
            formValues = me.getValues(me.getStandardSubmit() || !options.submitDisabled),
            form = me.element.dom || {};

        if(this.getEnableSubmissionForm()) {
            form = this.createSubmissionForm(form, formValues);
        }

        options = Ext.apply({
            url : me.getUrl() || form.action,
            submit: false,
            form: form,
            method : me.getMethod() || form.method || 'post',
            autoAbort : false,
            params : null,
            waitMsg : null,
            headers : null,
            success : null,
            failure : null
        }, options || {});

        // make sure 'doBeforeSubmit' is executed after any registered listeners
        return me.fireAction('beforesubmit', [me, formValues, options, e], 'doBeforeSubmit', me, {}, 'after');
    }
});