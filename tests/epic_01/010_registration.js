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

StartTest(function (t) {
    t.diag('User Registration');

    t.requireOk('Ext.ux.ajax.SimManager', function () {
        Ext.ux.ajax.SimManager.init().register({
            stype: 'json',
            url  : t.cq1('registerform').getUrl(),
            data : {
                success: true,
                data   : [{
                    id          : 1234,
                    emailAddress: 'user@example.com',
                    firstname   : 'Rokkie',
                    lastname    : 'Brown',
                    dateOfBirth : 458690400
                }]
            }
        });
    });

    t.chain({
        action: 'tap',
        target: '>>loginform button[itemId=newAccountBtn]'
    }, {
        action: 'type',
        target: '>>registerform field[name=emailAddress]',
        text: 'user@example.com'
    }, {
        action: 'type',
        target: '>>registerform field[name=password]',
        text: 'zxsecret'
    }, {
        action: 'type',
        target: '>>registerform field[name=passwordConfirm]',
        text: 'zxsecret'
    }, {
        action: 'type',
        target: '>>registerform field[name=firstname]',
        text: 'Rokkie'
    }, {
        action: 'type',
        target: '>>registerform field[name=lastname]',
        text: 'Brown'
    }, {
        action: 'tap',
        target: '>>registerform field[name=dateOfBirth]'
    }, {
        waitFor: 'CQ',
        args: ['datepicker button[itemId=doneBtn]']
    }, {
        waitFor: 100
    },{
        action: 'tap',
        target: '>>datepicker button[itemId=doneBtn]'
    }, {
        action: 'tap',
        target: '>>registerform checkboxfield[name=agreeToEULA]'
    }, {
        action: 'tap',
        target: '>>registerform button[itemId=registerBtn]'
    });

});