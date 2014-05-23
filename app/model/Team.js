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
 * Team model
 *
 * @author Rocco Bruyn <rocco@smoovz.com>
 */
Ext.define('Smoovz.model.Team', {
    extend: 'Ext.data.Model',
    alias: 'model.team',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.association.BelongsTo'
    ],

    uses: [
        'Smoovz.model.Club'
    ],

    statics: {
        ageClassMap: {
            seniors: 'ageclass_seniors',
            a      : 'ageclass_a',
            b      : 'ageclass_b',
            c      : 'ageclass_c',
            d      : 'ageclass_d',
            e      : 'ageclass_e',
            f      : 'ageclass_f',
            g      : 'ageclass_g',
            jg     : 'ageclass_jg',
            mp     : 'ageclass_mp',
            o      : 'ageclass_o',
            ve     : 'ageclass_ve',
            '35+'  : 'ageclass_35plus',
            '45+'  : 'ageclass_45plus'
        }
    },

    config: {
        fields: [{
            name: 'id',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }, {
            name: 'shortName',
            type: 'string'
        }, {
            name: 'gender',
            type: 'string'
        }, {
            name: 'ageClass',
            type: 'string'
        }, {
            name: 'teamNumber',
            type: 'int'
        }, {
            name: 'matchRound',
            type: 'string'
        }, {
            name: 'club',
            type: 'int',
            mapping: 'club_id'
        }],
        proxy: {
            type: 'rest',
            reader: {
                type: 'json',
                messageProperty: 'message',
                rootProperty: 'data'
            }
        },
        belongsTo: {
            instanceName: 'TeamBelongsToClubInstance',
            model: 'Smoovz.model.Club',
            foreignKey: 'club',
            getterName: 'getClub',
            setterName: 'setClub',
            reader: {
                type: 'json',
                messageProperty: 'message',
                rootProperty: 'data'
            }
        }
    },

    /**
     * Initialize model.
     * Is called from {@link Ext.data.Model#constructor} (gotta love them undocumented features)
     * Sets proxy url.
     *
     * @returns {void}
     */
    init: function () {
        var me = this;

        me.getProxy().setUrl(Config.getApiUrl() + 'team');
    }
});