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
 * Utility class for translating keys.
 *
 * @author Rocco Bruyn <rocco@smoovz.com>
 */
Ext.define('Smoovz.util.Il8n', {
    alternateClassName: 'Il8n',
    singleton: true,

    config: {
        defaultLanguage: 'en',
        translations: {
        	nl: {
                /* General */
        		name: 'Naam',
                email: 'Email',
                email_placeholder: 'email@voorbeeld.nl',
                password: 'Wachtwoord',
                firstname: 'Voornaam',
                lastname: 'Achternaam',
                date_of_birth: 'Geboortedatum',
                accept_terms: 'Ik accepteer de privacyverklaring en gebruiksvoorwaarden',
                ok: 'Ok',
                back: 'Terug',
                loading: 'Laden…',

                /* Team Categories */
                ageclass_seniors: 'Senioren (18+)',
                ageclass_a: 'Junioren A (17-18)',
                ageclass_b: 'Junioren B (15-16)',
                ageclass_c: 'Junioren C (13-14)',
                ageclass_d: 'Pupillen D (11-12)',
                ageclass_e: 'Pupillen E (9-10)',
                ageclass_f: 'Pupillen F (7-8)',
                ageclass_g: 'Gehandicapten (18+)',
                ageclass_jg: 'Jeugd Gehandicapten (tot 18)',
                ageclass_mp: 'Minipupillen (5-6)',
                ageclass_o: 'Senioren (tot 23)',
                ageclass_ve: 'Veteranen (35+)',
                ageclass_35plus: 'Veteranen 7vs7 (35+)',
                ageclass_45plus: 'Veteranen 7vs7 (45+)',

                /* Messages */
                password_no_match: 'komt niet overeen',

                /* Login form */
        		sign_in_title: 'Inloggen',
                sign_in_text: 'Log in met je emailadres',
                sign_in_btn_text: 'Inloggen',
                sign_in_wait_msg: 'Je wordt ingelogd',
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
                sign_in_fail_error_create_user_title: 'Je kan niet ingelogd worden',

                /* Register */
                register_title_12: 'Registreren 1/2',
                register_text: 'Create a new account',
                register_btn: 'Ga verder naar club & team kiezen',
                register_wait_msg: 'Je account word aangemaakt',

                /* Register fail */
                register_fail_title: 'Registratie mislukt',

                /* Club list */
                no_clubs_to_display: 'Geen clubs om te tonen',

                /* Teams list */
                no_teams_to_display: 'Geen teams om te tonen'
        	},
        	en: {
                /* General */
                name: 'Name',
                email_placeholder: 'email@example.com',
                email: 'Email',
                password: 'Password',
                firstname: 'First name',
                lastname: 'Last name',
                date_of_birth: 'Birthdate',
                accept_terms: 'I accept the privacystatement and terms of use',
                ok: 'Ok',
                back: 'Back',
                loading: 'Loading…',

                /* Team categories */
                ageclass_seniors: 'Seniors (18+)',
                ageclass_a: 'Juniors A (17-18)',
                ageclass_b: 'Juniors B (15-16)',
                ageclass_c: 'Juniors C (13-14)',
                ageclass_d: 'Pupills D (11-12)',
                ageclass_e: 'Pupills E (9-10)',
                ageclass_f: 'Pupills F (7-8)',
                ageclass_g: 'Disabled (18+)',
                ageclass_jg: 'Young Disabled (up to 18)',
                ageclass_mp: 'Minipupils (5-6)',
                ageclass_o: 'Seniors (up to 23)',
                ageclass_ve: 'Veterans (35+)',
                ageclass_35plus: 'Veterans 7vs7 (35+)',
                ageclass_45plus: 'Veterans 7vs7 (45+)',

                /* Messages */
                password_no_match: 'does not match',

                /* Login form */
                sign_in_title: 'Sign in',
                sign_in_text: 'Sign in with your email address',
                sign_in_btn_text: 'Sign in',
                sign_in_wait_msg: 'You are being signed in',
                lost_password: 'Did you loose your password?',
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
                sign_in_fail_error_create_user_title: 'You could not be logged in',

                /* Register */
                register_title_12: 'Register 1/2',
                register_text: 'Create a new account',
                register_btn: 'Continue choosing club & team',
                register_wait_msg: 'Your account is being created',

                /* Register fail */
                register_fail_title: 'Registration failed',

                /* Club list */
                no_clubs_to_display: 'No clubs to display',

                /* Teams list */
                no_teams_to_display: 'Nu teams to display'
        	}
        }
    },

    /**
     * Create a new Il8n.
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
     * Translate a key.
     *
     * @param   {String} key
     * @returns {String}
     */
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