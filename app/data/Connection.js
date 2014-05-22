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
 * Compatibility layer for {@link Ext.ux.ajax.SimManager}
 *
 * @author Rocco Bruyn <rocco@smoovz.com>
 */
Ext.define('Smoovz.data.Connection', {
    override: 'Ext.data.Connection',

    /**
     * Create and return an XMLHttpRequest.
     * This just wraps around {@link Ext.data.Connection#getXhrInstance} in order
     * to make it compatible with {@link Ext.ux.ajax.SimManager}
     *
     * @param   {Object} options
     * @returns {XMLHttpRequest}
     */
    newRequest: function (options) {
        var me  = this,
            xhr = me.getXhrInstance();
        return xhr;
    },

    /**
     * Create a new XMLHttpRequest, open the connection and return the instance.
     * This is here to make {@link Ext.data.Connection} compatible with {@link Ext.ux.ajax.SimManager}
     *
     * @param   {Object} options
     * @param   {Object} requestOptions
     * @param   {Boolean} async
     * @param   {String} username
     * @param   {String} password
     * @returns {XMLHttpRequest}
     */
    openRequest: function (options, requestOptions, async, username, password) {
        var me  = this,
            xhr = me.newRequest(options);

        if (username) {
            xhr.open(requestOptions.method, requestOptions.url, async, username, password);
        } else {
            xhr.open(requestOptions.method, requestOptions.url, async);
        }

        return xhr;
    },

    /**
     * @inheritdoc
     */
    request: function(options) {
        options = options || {};
        var me = this,
            scope = options.scope || window,
            username = options.username || me.getUsername(),
            password = options.password || me.getPassword() || '',
            useXhr2 = options.xhr2 === true && Ext.feature.has.XHR2,
            async, requestOptions, request, headers, xhr;

        if(!Ext.isEmpty(username) && !Ext.isEmpty(password, true) && Ext.isEmpty(options.withCredentials)){
            options.withCredentials = true;
        }

        if (me.fireEvent('beforerequest', me, options) !== false) {
            requestOptions = me.setOptions(options, scope);

            if (this.isFormUpload(options) === true) {
                this.upload(options.form, requestOptions.url, requestOptions.data, options);
                return null;
            }

            // if autoabort is set, cancel the current transactions
            if (options.autoAbort === true || me.getAutoAbort()) {
                me.abort();
            }

            // create a connection object
            async = options.async !== false ? (options.async || me.getAsync()) : false;
            xhr = me.openRequest(options, requestOptions, async, username, password);

            headers = me.setupHeaders(xhr, options, requestOptions.data, requestOptions.params);

            // create the transaction object
            request = {
                id: ++Ext.data.Connection.requestId,
                xhr: xhr,
                headers: headers,
                options: options,
                async: async,
                timeout: setTimeout(function() {
                    request.timedout = true;
                    me.abort(request);
                }, options.timeout || me.getTimeout())
            };
            me.requests[request.id] = request;


            // bind our onload/statechange listener
            if (async) {
                xhr[useXhr2 ? 'onload' : 'onreadystatechange'] = Ext.Function.bind(me.onStateChange, me, [request]);
            }

            if(useXhr2) {
                xhr.onerror = Ext.Function.bind(me.onStateChange, me, [request]);
            }

            if(options.progress) {
                xhr.onprogress = function(e) {
                    if(options.progress.isProgressable) {
                        if(e.total === 0 && options.progress.getDynamic()) {
                            Ext.Logger.warn("Server is not configured to properly return Content-Length. Dynamic progress will be disabled");
                            options.progress.setState.call(options.progress, "download");
                            options.progress.setDynamic(false);
                            xhr.onprogress = null;
                            return;
                        }

                        Ext.callback(options.progress.updateProgress, options.progress, [(e.loaded / e.total), "download"]);

                        if(e.total > 0 && !options.progress.getDynamic() && options.progress.getInitialConfig().dynamic) {
                            options.progress.setDynamic(true);
                        }
                    }else if(Ext.isFunction(options.progress)) {
                        Ext.callback(options.progress, options.progressScope || request, [e, "download"])
                    }
                };

                if(Ext.feature.has.XHRUploadProgress) {
                        xhr.upload.onprogress = function (e){
                        me.fireEvent('requestuploadprogress', me, request, e);
                        if(options.progress.isProgressable) {
                            Ext.callback(options.progress.updateProgress, options.progress, [(e.loaded / e.total), "upload"]);
                        }else if(Ext.isFunction(options.progress)) {
                            Ext.callback(options.progress, options.progressScope || request, [e, "upload"])
                        }
                    };
                }

                if(options.progress.isProgressable) {
                    if(!Ext.feature.has.XHRUploadProgress) options.progress.setDynamic(false);
                    Ext.callback(options.progress.startProgress, options.progress);
                }
            }

            // start the request!
            xhr.send(requestOptions.data);

            if (!async) {
                return this.onComplete(request);
            }
            return request;
        } else {
            Ext.callback(options.callback, options.scope, [options, undefined, undefined]);
            return null;
        }
    }
});