define([
  'lodash',
  'backbone'
], function(_, Backbone) {
  var fieldModel = Backbone.Model.extend({
    name: 'Field',
    label: 'Pregunta',
    urlRoot: 'field',
    events: {
      'change:type': {
        'show': {
          'Pregunta': ['answers']
        }
      }
    },
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Titulo de la pregunta',
        rules: {
          required: true
        },
        helpText: 'Nombre de la pregunta que aparecera en la encuesta'
      },
      {
        name: 'type',
        type: 'single_choice',
        label: 'Tipo',
        rules: {
          required: true
        },
        answers:[{value:'0', text:'Pregunta'}, {value:'1', text:'Titulo'}],
        defaultValue: 'Pregunta',
        helpText: 'Al seleccionar titulo creara un titulo de sección'
      },
      {
        name: 'answers',
        type: 'textarea',
        label: 'Respuestas',
        rules: {
          required: true
        },
        defaultValue:'Nada de acuerdo / Nunca / Nada\nPoco de acuerdo / Ocasionalmente / Poco\nRegular de acuerdo / Algunas veces / Regular\nMuy de acuerdo / Casi siempre / Mucho\nTotalmente de acuerdo / Siempre / Todo',
        helpText: 'Puede introducir una escala de valoracion personal uno por cada linea donde el peso va de menor a mayor.'
      },
      {
        name: 'id_survey',
        type: 'hidden',
        label: 'id_survey',
        rules: {
          required: true
        }
      }
    ],
    views: {
      'field':{
        'name':'field',
        'columns':[
          {name:'name', label:'Titulo de la pregunta'},
          {name:'type', label:'Tipo'}
        ],
        'type':'inline',
        sortable: true
      }
    },
    defaults: {
      name: '',
      answers: ''
    },
    parents: [
      {
        'model':'survey',
        'foreign_key': {
          'id':'id_survey'
        }
      }
    ],
    initialize: function(){
    }

  });
  return fieldModel;
});
