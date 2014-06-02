/*
 * Copyright (C) 2014 Tim Schipper <tim@smoovz.com>
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
 * Class to validate the {@link Smoovz.form.Register register} form.
 *
 * @author Tim Schipper <tim@smoovz.com>
 */
Ext.define('Smoovz.form.validate.Password', {
    extend: 'Smoovz.form.validate.Validate',

    config: {
        validations: [{
            field: 'emailAddress',
            type: 'presence'
        }, {
            field: 'emailAddress',
            type: 'email'
        }]
    }
});