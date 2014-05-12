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


var Harness = Siesta.Harness.Browser.SenchaTouch;

Harness.configure({
    title        : 'Smoovz integration test Suite',
    viewportWidth: 480,
    preload      : [
        // version of Sencha Touch used by your application
        '../touch/resources/css/sencha-touch.css',
        '../resources/css/smoovz-touchapp.css',

        // version of Sencha Touch used by your application
        '../touch/sencha-touch-all-debug.js',
        '../app.js'
    ]
});

Harness.start({
    group       : 'Application tests',
    hostPageUrl : '../',
    performSetup: false,
    items       : [
        '010_sanity.t.js',
        '020_basic.t.js'
    ]
});