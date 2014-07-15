define([
  'lodash',
  'backbone'
], function(_, Backbone) {
  var usersModel = Backbone.Model.extend({
    name: 'User',
    urlRoot: 'users',
    fields: [
      {
        name: 'email',
        type: 'text',
        label: 'eMail',
        rules: {
          required: true
        }
      },
      {
        name: 'name',
        type: 'text',
        label: 'Nombre',
        rules: {
          required: true
        }
      },
	  {
        name: 'password',
        type: 'text',
        label: 'password',
        rules: {
          required: true
        }
      },
      {
        name: 'type',
        type: 'single_choice',
        label: 'Tipo',
        rules: {
          required: true
        },
        answers:[{value:'0', text:'Administrador'}, {value:'1', text:'Usuario'}],
        defaultValue: 'Usuario'
      }
    ],
    defaults: {
      email: null,
      password: null,
      name: null,
      type: null
    },
    initialize: function(){
    }

  });
  return usersModel;
});
