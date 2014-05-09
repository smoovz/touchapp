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
 * Class to validate the {@link Smoovz.form.Register register} form
 *
 * @class Smoovz.form.validate.Register
 * @author Rocco Bruyn <rocco@smoovz.com>
 */
Ext.define('Smoovz.form.validate.Register', {
    extend: 'Smoovz.form.validate.Abstract',

    config: {
        validations: [{
            field: 'emailAddress',
            type: 'presence'
        }, {
            field: 'emailAddress',
            type: 'email'
        }, {
            field: 'password',
            type: 'presence'
        }, {
            field: 'password',
            type: 'length',
            min: 8
        }, {
            field: 'passwordConfirm',
            type: 'presence'
        }, {
            field: 'firstname',
            type: 'presence'
        }, {
            field: 'firstname',
            type: 'length',
            min: 2
        }, {
            field: 'lastname',
            type: 'presence'
        }, {
            field: 'firstname',
            type: 'length',
            min: 2
        }, {
            field: 'dateOfBirth',
            type: 'presence'
        }, {
            field: 'agreeToEULA',
            type: 'presence'
        }]
    }
});