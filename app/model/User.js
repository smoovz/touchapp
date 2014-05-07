Ext.define('Smoovz.model.User', {
    extend: 'Ext.data.Model',

    config: {
        fields: [{
            name: 'id',
            type: 'int'
        }, {
            name: 'firstname',
            type: 'string'
        }, {
            name: 'lastname',
            type: 'string'
        }, {
            name: 'emailAddress',
            type: 'string'
        }, {
            name: 'dateOfBirth',
            type: 'date',
            dateFormat: 'timestamp'
        }],

        validations: [{
            field: 'id',
            type: 'presence'
        }, {
            field: 'firstname',
            type: 'presence'
        }, {
            field: 'lastname',
            type: 'presence'
        }, {
            field: 'emailAddress',
            type: 'presence'
        }, {
            field: 'emailAddress',
            type: 'email'
        }, {
            field: 'dateOfBirth',
            type: 'presence'
        }]
    }
});
