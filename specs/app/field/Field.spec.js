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
    var field;

    // Setup
    beforeEach(function () {
        field = Ext.create('Ext.field.Text');
    });

    // Teardown
    afterEach(function () {
        field.destroy();
        field = undefined;
    });

    // test if accessors work
    it('accessors', function () {
        var defaultCls = field.getInvalidCls(),
            customCls  = 'custom-css-class',
            testCls;
        expect(defaultCls).toBe('smvz-field-invalid');

        field.setInvalidCls(customCls);
        testCls = field.getInvalidCls();
        expect(testCls).toBe(customCls);
    });

    // test if invalid class get added removed
    it('invalid marking', function () {
        var invalidCls = field.getInvalidCls(),
            hasCls;

        field.markInvalid();
        hasCls = field.element.hasCls(invalidCls);
        expect(hasCls).toBe(true);

        field.clearInvalid();
        hasCls = field.element.hasCls(invalidCls);
        expect(hasCls).toBe(false);
    });

});