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
        		sign_in: 'Inloggen',
        		name   : 'Naam',
                email  : 'Email'
        	},
        	en: {
        		sign_in: 'Sign In',
                name   : 'Name',
                email  : 'Email'
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