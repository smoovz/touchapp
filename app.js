/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/
Ext.Loader.setConfig({
    disableCaching: false
});

Ext.application({
    name: 'Smoovz',

    requires: [
        'Ext.MessageBox',
        'Smoovz.data.Errors',
        'Smoovz.form.Panel',
        'Smoovz.field.Field',
        'Smoovz.util.Auth',
        'Smoovz.util.Config',
        'Smoovz.util.Il8n'
    ],

    uses: [
        'Ext.Ajax'
    ],

    controllers: [
        'Smoovz.controller.MainController',
        'Smoovz.controller.PasswordController',
        'Smoovz.controller.RegistrationController',
        'Smoovz.controller.SessionController',
        'Smoovz.controller.TeamSelectController'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        var me      = this,
            history = me.getHistory(),
            ctrl;

        // Register global xhr handler
        me.registerAjaxHandlers();

        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // If we don't have a history token, add login action to the stack
        if(!history.getToken()) {
            ctrl = me.getController('SessionController');
            history.add({
                application: me,
                controller: ctrl,
                action: 'login',
                scope: ctrl.login,
                url: 'login'
            }, true);
        }
    },

    /**
     * Register global Ajax listeners to check for HTTP 401, 403, 500 etc.
     *
     * @returns {void}
     */
    registerAjaxHandlers: function () {
        var me = this;

        Ext.Ajax.on({
            requestcomplete: me.onRequestComplete,
            requestexception: me.onRequestException
        });
    },

    /**
     * Event handler for all xhr-requests that are completed.
     * Checks for [HTTP Status Codes](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes).
     * @todo refactor to separate class (single responsibility and whatnot..).
     *
     * @protected
     * @param   {Ext.data.Connection} conn The connection object
     * @param   {Object} response The [XHR](http://www.w3.org/TR/XMLHttpRequest) object containing the response data
     * @param   {Object} opts The options config object passed to the {@link Ext.Ajax#request request} method
     * @param   {Object} eOpts The options object passed to {@link Ext.util.Observable#addListener addListener}
     * @returns {void}
     */
    onRequestComplete: function (conn, response, opts, eOpts) {
        var me = this;

        switch (response.status) {
            case 200:   // OK
            default:
                break;

            case 401:   // Unauthorized
                me.redirectTo('login');
                break;
            case 403:   // Forbidden
                Ext.toast('__forbidden__', 3000);
                break;
        }
    },

    /**
     * Event handler for all xhr-requests that are completed.
     * Checks for [HTTP Status Codes](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes).
     * @todo refactor to separate class (single responsibility and whatnot..).
     *
     * @param   {Ext.data.Connection} conn The connection object
     * @param   {Object} response The [XHR](http://www.w3.org/TR/XMLHttpRequest) object containing the response data
     * @param   {Object} opts The options config object passed to the {@link Ext.Ajax#request request} method
     * @param   {Object} eOpts The options object passed to {@link Ext.util.Observable#addListener addListener}
     * @returns {void}
     */
    onRequestException: function (conn, response, opts, eOpts) {
        Ext.toast('__xhror__', 3000);
    }
});
