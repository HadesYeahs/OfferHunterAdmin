define([
  'lodash',
  'backbone'
], function(_, Backbone) {
  var user_surveyModel = Backbone.Model.extend({
    name: 'user_surveyModel',
    label: 'Relacion usuarios / encuesta',
    urlRoot: 'usersurvey',
    fields: [
      {
        name: 'username',
        type: 'list',
        label: 'Usuario a encuestar',
        rules: {
          required: true
        },
        catalog: {
          url:'users',
          text:'email',
          id:'id'
        }
      },
      {
        name: 'survey',
        type: 'list',
        label: 'Encuesta',
        rules: {
          required: true
        },
        catalog: {
          url:'survey',
          text:'name',
          id:'id'
        }
      },
      {
        name: 'id_user',
        type: 'hidden',
        label: 'id_user',
        rules: {
          required: true
        }
      }
    ],
    views: {
      'user_survey':{
        'name':'user_survey',
        'columns':[
          {name:'username', label:'Usuario a encuestar'},
          {name:'survey', label:'Encuesta seleccionada'}
        ],
        'type':'inline'
      }
    },
    defaults: {
      username: '',
      survey: ''
    },
    parents: [
      {
        'model':'user',
        'foreign_key': {
          'id':'id_user'
        }
      }
    ],
    initialize: function(){
    }

  });
  return user_surveyModel;
});
