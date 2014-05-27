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

describe('Smoovz.field.Field', function () {
    var defaultInvalidCls = 'smvz-field-invalid',
        field;

    // Setup
    beforeEach(function () {
        field = Ext.create('Ext.field.Text');
    });

    // Teardown
    afterEach(function () {
        field.destroy();
        field = undefined;
    });

    // test default invalid class and inherently the getter
    if('has correct default invalid class', function () {
        var defaultCls = field.getInvalidCls();
        expect(defaultCls).toBe(defaultInvalidCls);
    });

    // test setting a custom invalid class works and inherently the getter
    it('can set a custom invalid class', function () {
        var customCls = 'custom-css-class',
            testCls;

        field.setInvalidCls(customCls);
        testCls = field.getInvalidCls();
        expect(testCls).toBe(customCls);
    });

    // test if invalid class gets added
    it('can be marked invalid', function () {
        var invalidCls = field.getInvalidCls(),
            hasCls;

        field.markInvalid();
        hasCls = field.element.hasCls(invalidCls);
        expect(hasCls).toBe(true);
    });

    // test if invalid class gets removed
    it('can be cleared of invalid state', function () {
        var invalidCls = field.getInvalidCls(),
            hasCls;

        field.markInvalid();
        field.clearInvalid();
        hasCls = field.element.hasCls(invalidCls);
        expect(hasCls).toBe(false);
    });

});