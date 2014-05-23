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
 * Registration store.
 * Backed by localstorage, saves {@link Smoovz.model.User user model} during
 * registration so it can be resumed later on.
 *
 * @author Rocco Bruyn <rocco@smoovz.com>
 */
Ext.define('Smoovz.store.Registration', {
    extend: 'Ext.data.Store',
    alias: 'store.registration',

    requires: [
        'Ext.data.proxy.LocalStorage',
        'Smoovz.model.User'
    ],

    config: {
        model: 'Smoovz.model.User',
        storeId: 'Registration',
        proxy: {
            type: 'localstorage',
            id: 'smoovz-user-register'
        }
    }
});