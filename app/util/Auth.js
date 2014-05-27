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
 * Authentication utility
 *
 * @author Rocco Bruyn <rocco@smoovz.com>
 */
Ext.define('Smoovz.util.Auth', {
    alternateClassName: 'Auth',
    singleton: true,

    requires: [
        'Ext.Ajax'
    ],

    uses: [
        'Smoovz.model.User',
        'Smoovz.util.Config'
    ],

    config: {
        /**
         * @cfg {Smoovz.model.User} user
         * Currently signed in user
         */
        user: null
    },

    /**
     * Create a new Auth.
     *
     * @param   {Object} config
     * @returns {void}
     */
    constructor: function(config) {
        var me = this;

        me.initConfig(config);
        me.callParent([config]);
    },

    /**
     * Check against the server if the user has a login session.
     *
     * @param   {Object} opts An object which may contain the following properties:
     *
     * @param   {Function} opts.success The function to be called if the user is logged in.
     * The callback is called with the follwing parameters:
     * @param   {Smoovz.model.User} opts.success.user The logged in user
     *
     * @param   {Function} opts.failure The function to be called if the user is not logged in.
     * The callback is called with the follwing parameters:
     * @param   {String} opts.failure.message
     *
     * @param   {Object} opts.scope  The scope in which to execute the callbacks.
     *
     * @returns {void}
     */
    check: function (opts) {
        var me   = this,
            opts = opts || {},
            p    = new Promise(Ext.bind(me.doCheckRequest, me));

        p.then(function (data) {
            me.setUser(Ext.create('Smoovz.model.User', data));
            return me.getUser();
        }).then(Ext.bind(opts.success || Ext.emptyFn, opts.scope || window),
                Ext.bind(opts.failure || Ext.emptyFn, opts.scope || window));
    },

    /**
     * Log user out by destroying the session.
     *
     * @param   {Object} opts An object which may contain the following properties:
     *
     * @param   {Function} opts.success The function to be called when the user is logged out.
     *
     * @param   {Function} opts.failure The function to be called if the user is not logged out.
     * The callback is called with the follwing parameters:
     * @param   {String} opts.failure.message
     *
     * @param   {Object} opts.scope  The scope in which to execute the callbacks.
     *
     * @returns {void}
     */
    logout: function (opts) {
        var me = this,
            opts = opts || {},
            p    = new Promise(Ext.bind(me.doLogout, me));

        p.then(function () {
            me.setUser(null);
        }).then(Ext.bind(opts.success || Ext.emptyFn, opts.scope || window),
                Ext.bind(opts.failure || Ext.emptyFn, opts.scope || window));
    },

    /**
     * Perform ajax request to the API to check for a login session.
     *
     * @private
     * @param   {Function} resolve
     * @param   {Function} reject
     * @returns {void}
     */
    doCheckRequest: function (resolve, reject) {
        var me = this;

        Ext.Ajax.request({
            url: Config.getApiUrl() + 'session/me',
            success: me.onAuthCheckSuccess,
            failure: me.onAuthCheckFailure,
            scope: me,
            resolve: resolve,
            reject: reject
        });
    },

    /**
     * Perform ajax request to the API to destroy the login session.
     *
     * @private
     * @param   {Function} resolve
     * @param   {Function} reject
     * @returns {void}
     */
    doLogout: function (resolve, reject) {
        var me = this;

        Ext.Ajax.request({
            url: Config.getApiUrl() + 'session/me',
            method: 'DELETE',
            success: me.onLogoutSuccess,
            failure: me.onLogoutFailure,
            scope: me,
            resolve: resolve,
            reject: reject
        });
    },

    /**
     * Callback for when the check for a login session succesfully returns.
     * Tries to decode the response and resolves / rejects the promise based on the result.
     *
     * @private
     * @param   {XMLHttpRequest} response
     * @param   {Object} opts
     * @returns {void}
     */
    onAuthCheckSuccess: function (response, opts) {
        var me = this,
            o  = Ext.decode(response.responseText);

        if (o.success && o.success === true) {
            opts.resolve(o.data);
        } else {
            opts.reject(o.message || '__genericmessage__');
        }
    },

    /**
     * Callback for when the check for a login session went awry.
     * Rejects the promise unconditionally with a generic message.
     *
     * @private
     * @param   {XMLHttpRequest} response
     * @param   {Object} opts
     * @returns {void}
     */
    onAuthCheckFailure: function (response, opts) {
        var me = this;

        opts.reject('__genericmessage__');
    },

    /**
     * Callback for when the destruction of the login session succesfully returns.
     * Tries to decode the response and resolves / rejects the promise based on the result.
     *
     * @private
     * @param   {XMLHttpRequest} response
     * @param   {Object} opts
     * @returns {void}
     */
    onLogoutSuccess: function (response, opts) {
        var me = this,
            o  = Ext.decode(response.responseText);

        if (o.success && o.success === true) {
            opts.resolve();
        } else {
            opts.reject(o.message || '__genericmessage__');
        }
    },

    /**
     * Callback for when the destrcution of the login session went awry.
     * Rejets the promise unconditionally with a generic message.
     *
     * @private
     * @param   {XMLHttpRequest} response
     * @param   {Object} opts
     * @returns {void}
     */
    onLogoutFailure: function (response, opts) {
        var me = this;

        opts.reject('__genericmessage__');
    }
});