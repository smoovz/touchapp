Ext.define('Smoovz.controller.SessionController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route',
        'Ext.Ajax',
        'Ext.MessageBox',
        'Ext.String',
        'Ext.viewport.Viewport'
    ],

    config: {
        models: [
            'Smoovz.model.User'
        ],
        views: [
            'Smoovz.form.LoginForm'
        ],
        routes: {
            'login': 'login',
            'logout': 'logout'
        },
        refs: {
            loginForm: 'loginform'
        },
        control: {
            'loginform button': {
                tap: 'onLoginBtnTap'
            },
            'button[cmd=logout]': {
                tap: 'onLogoutBtnTap'
            }
        }
    },

    //called when the Application is launched, remove if not needed
    launch: function(app) {
        var me = this;

        Ext.Ajax.on({
            requestcomplete: me.onRequestComplete,
            requestexception: me.onRequestException
        });
    },

    login: function () {
        var me = this;

        Ext.Viewport.setActiveItem(me.getLoginForm());
    },

    logout: function () {
        var me = this;

        Config.setAuthUser(null);
        me.redirectTo('login');
    },

    onLogoutBtnTap: function (btn, evt, opts) {
        var me = this;

        me.redirectTo('logout');
    },

    onLoginBtnTap: function (btn, evt, opts) {
        var me = this;

        me.getLoginForm().submit({
            waitMsg: Il8n.translate('sign_in_wait_msg'),
            success: me.onLoginSuccess,
            failure: me.onLoginFailure,
            scope: me
        });
    },

    onLoginSuccess: function (form, result, data) {
        var me   = this,
            rd   = result.data,
            user = Ext.create('Smoovz.model.User', {
                id: rd.id,
                firstname: rd.firstname,
                lastname: rd.lastname,
                emailAddress: rd.emailAddress,
                dateOfBirth: rd.dateOfBirth
            }),
            errors = user.validate(),
            messages = [], msg;

        if (errors.isValid()) {
            Config.setAuthUser(user);
            Ext.Viewport.setActiveItem('main');
            return;
        }

        errors.each(function (err) {
            msg = Ext.String.format('{0} {1}', err.getField(), err.getMessage());
            messages.push(msg);
        }, me);

        Ext.Msg.show({
            title: Il8n.translate('sign_in_fail_error_create_user_title'),
            message: messages.join('<br>'),
            icon: Ext.MessageBox.ERROR
        });
    },

    onLoginFailure: function (form, result) {
        var me = this;

        Ext.Msg.show({
            title: Il8n.translate('sign_in_fail_title'),
            message: Il8n.translate('sign_in_fail_msg'),
            buttons: [{
                text: Il8n.translate('sign_in_fail_new_account'),
                itemId: 'newAccount'
            }, {
                text: Il8n.translate('sign_in_fail_new_password'),
                itemId: 'newPassword'
            }],
            icon: Ext.Msg.WARNING,
            scope: me,
            fn: function (btnId, value, opt) {
                switch (btnId) {
                    case 'newPassword':
                        console.log('NEW PASS');
                        break;
                    case 'tryAgain':
                    default:
                        console.log('if at first you don\'t succeed..');
                        break;
                }
            }
        });
    },

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
                break;
        }
    },

    onRequestException: function (conn, response, opts, eOpts) {
        console.log('request exception');
    }
});
