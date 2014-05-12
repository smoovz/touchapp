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

describe('Smoovz.form.validate.Validate', function () {
    var form, field, validator, errors;

    // Setup
    beforeEach(function () {
        form = Ext.create('Ext.form.Panel', {
            items: [{
                xtype: 'textfield',
                name: 'testField_1'
            }, {
                xtype: 'emailfield',
                name: 'testField_2'
            }, {
                xtype: 'checkboxfield',
                name: 'testField_3',
                value: 'yes'
            }]
        }),
        field = Ext.create('Ext.field.Text', {
            name: 'testField_1'
        }),
        validator = Ext.create('Smoovz.form.validate.Validate', {
            validations: [{
                field: 'testField_1',
                type: 'length',
                min: 5
            }, {
                field: 'testField_2',
                type: 'email'
            }, {
                field: 'testField_3',
                type: 'presence'
            }]
        });

        spyOn(field, 'markInvalid');
        spyOn(field, 'clearInvalid');
    });

    // Teardown
    afterEach(function () {
        form.destroy();
        form = undefined;
        field.destroy();
        field = undefined;
        validator.destroy();
        validator = undefined;
    });

    // test validation of a single field
    it("validate field with invalid value, don't mark", function () {
        field.setValue('foo');
        errors = validator.validateField(field, false);
        expect(field.markInvalid).not.toHaveBeenCalled();
        expect(errors.isValid()).toBe(false);
    });

    it('validate field with invalid value, do mark', function () {
        field.setValue('foo');
        errors = validator.validateField(field, true);
        expect(field.markInvalid).toHaveBeenCalled();
        expect(errors.isValid()).toBe(false);
    });

    it("validate field with valid value, don't mark", function () {
        field.setValue('foobar');
        errors = validator.validateField(field, false);
        expect(field.clearInvalid).not.toHaveBeenCalled();
        expect(errors.isValid()).toBe(true);
    });

    it('validate field with valid value, do mark', function () {
        field.setValue('foobar');
        errors = validator.validateField(field, true);
        expect(field.clearInvalid).toHaveBeenCalled();
        expect(errors.isValid()).toBe(true);
    });

    // test validation of an entire form
    it("validate form with 1 invalid value, don't mark", function () {
        var field1 = form.down('field[name=testField_1]');

        spyOn(field1, 'markInvalid');

        field1.setValue('foo');
        errors = validator.validateForm(form, false);
        expect(field1.markInvalid).not.toHaveBeenCalled();
        expect(errors.isValid()).toBe(false);
    });

    it('validate form with 1 invalid value, do mark', function () {
        var field2 = form.down('field[name=testField_2]');

        spyOn(field2, 'markInvalid');

        field2.setValue('notAnEmailAddress');
        errors = validator.validateForm(form, true);
        expect(field2.markInvalid).toHaveBeenCalled();
        expect(errors.isValid()).toBe(false);
    });

    it("validate form with all valid values don't mark", function () {
        var field1 = form.down('field[name=testField_1]'),
            field2 = form.down('field[name=testField_2]'),
            field3 = form.down('field[name=testField_3]');

        spyOn(field1, 'clearInvalid');
        spyOn(field2, 'clearInvalid');
        spyOn(field3, 'clearInvalid');

        field1.setValue('foobar');
        field2.setValue('foo@bar.baz');
        field3.check();

        errors = validator.validateForm(form, false);
        expect(field1.clearInvalid).not.toHaveBeenCalled();
        expect(field2.clearInvalid).not.toHaveBeenCalled();
        expect(field3.clearInvalid).not.toHaveBeenCalled();
        expect(errors.isValid()).toBe(true);
    });

    it("validate form with all valid values do mark", function () {
        var field1 = form.down('field[name=testField_1]'),
            field2 = form.down('field[name=testField_2]'),
            field3 = form.down('field[name=testField_3]');

        spyOn(field1, 'clearInvalid');
        spyOn(field2, 'clearInvalid');
        spyOn(field3, 'clearInvalid');

        field1.setValue('foobar');
        field2.setValue('foo@bar.baz');
        field3.check();

        errors = validator.validateForm(form, true);
        expect(field1.clearInvalid).toHaveBeenCalled();
        expect(field2.clearInvalid).toHaveBeenCalled();
        expect(field3.clearInvalid).toHaveBeenCalled();
        expect(errors.isValid()).toBe(true);
    });

    // test clearing of invalid status on entire form
    it('clear form of invalid status', function () {
        var field1 = form.down('field[name=testField_1]'),
            field2 = form.down('field[name=testField_2]'),
            field3 = form.down('field[name=testField_3]');

        spyOn(field1, 'clearInvalid');
        spyOn(field2, 'clearInvalid');
        spyOn(field3, 'clearInvalid');

        form.clearInvalid();
        expect(field1.clearInvalid).toHaveBeenCalled();
        expect(field2.clearInvalid).toHaveBeenCalled();
        expect(field3.clearInvalid).toHaveBeenCalled();
    });
});