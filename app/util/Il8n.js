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

Ext.define('Smoovz.util.Il8n', {
    alternateClassName: 'Il8n',
    singleton         : true,

    config: {
        defaultLanguage: 'nl',
        translations   : {
        	nl: {
                /* Login form */
        		sign_in_title: 'Inloggen',
                sign_in_text: 'Log in met je emailadres',
                sign_in_btn_text: 'Inloggen',
                sign_in_wait_msg: 'Je wordt ingelogd',
        		name: 'Naam',
                email: 'Email',
                email_placeholder: 'email@voorbeeld.nl',
                password: 'Wachtwoord',
                lost_password: 'Ben je je wachtwoord vergeten?',
                no_account_yet: 'Nog geen SMOOVZ account?',
                new_account_btn: 'Nieuw account aanmaken',
                new_password_btn: 'Nieuw wachtwoord opvragen',
                try_again_btn: 'Opnieuw proberen',

                /* Login fail */
                sign_in_fail_title: 'Inloggen mislukt',
                sign_in_fail_msg: [
                    'Het emailadres en/of wachtwoord is niet bekend.',
                    'Maak een nieuw account aan of vraag je wachtwoord opnieuw op.'
                ].join('<br>'),
                sign_in_fail_error_create_user_title: 'Je kan niet ingelogd worden'
        	},
        	en: {
                /* Login form */
                sign_in_title: 'Sign in',
                sign_in_text: 'Sign in with your emailaddress',
                sign_in_btn_text: 'Sign in',
                sign_in_wait_msg: 'You are being signed in',
                name: 'Name',
                email_placeholder: 'email@example.com',
                email: 'Email',
                password: 'Password',
                lost_password: 'Did you lost your password?',
                no_account_yet: 'No SMOOVZ account yet?',
                new_account_btn: 'Create new account',
                new_password_btn: 'Request new password',
                try_again_btn: 'Try again',

                /* Login fail */
                sign_in_fail_title: 'Sign in failed',
                sign_in_fail_msg: [
                    'The supplied credentials are unknown.',
                    'Create a new account or request a new password'
                ].join('<br>'),
                sign_in_fail_error_create_user_title: 'You could not be logged in'
        	}
        }
    },

    constructor: function(config) {
        var me = this;

        me.initConfig(config);
        me.callParent([config]);
    },

    translate: function (key) {
    	var me = this,
            browserLanguage = window.navigator.userLanguage || window.navigator.language,
            language = me.getTranslations()[browserLanguage] === undefined ? me.getDefaultLanguage() : browserLanguage,
            translation = "[" + key + "]",
            tokenCount, token, re;

    	if (me.getTranslations()[language][key] === undefined) {
    		// Key not found in language : tries default one
    		if (me.getTranslations()[me.getDefaultLanguage()][key] !== undefined) {
    			translation = me.getTranslations()[me.getDefaultLanguage()][key];
    		}
    	} else {
    		// Key found
    		translation = me.getTranslations()[language][key];
    	}

    	// If there is more than one argument : format string
    	if (arguments.length > 1) {
    	    tokenCount = arguments.length - 2;
            for(token = 0; token <= tokenCount; token++ ) {
                re = new RegExp( "\\{" + token + "\\}", "gi" ), arguments[token + 1];
    	    	translation = translation.replace(re);
    	    }
    	}

    	return translation;
    }
});