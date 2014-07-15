define([
  'jquery',
  'lodash',
  'backbone',
  'text!templates/survey/basicSurvey.html',
  'vm'
], function($, _, Backbone, surveyTemplate, Vm){
  var UsersPage = Backbone.View.extend({
    el: '.main',
    initialize: function(){
      var self = this;
      /*
      self.model.set({
        name: 'Evaluacion de desempeño para directora general',
        description: 'Esta es una encuesta prueba de concepto',
        active: true,
        instructions: 'Lea cuidadosamente cada enunciado y seleccione una opcion de respuesta de acuerdo con la escala de valoración.',
        comments: '',
        controls: [
          {
            name: 'A1',
            type: 'header',
            label: 'Relaciones con el consejo directivo'
          },
          {
            name: 'A2',
            type: 'single_choice',
            label: 'Mantiene una comunicación efectiva y constructiva con el Consejo Directivo',
            rules: {
              required: true
            },
            answers: ['Nunca','Ocasionalmente','Algunas veces','Casi siempre','Siempre']
          },
          {
            name: 'A3',
            type: 'single_choice',
            label: 'Presenta dos veces durante el ciclo escolar el informe de las actividades del Colegio realizadas durante el periodo correspondiente.',
            rules: {
              required: true
            },
            answers: ['Nunca','Ocasionalmente','Algunas veces','Casi siempre','Siempre']
          },
          {
            name: 'A4',
            type: 'single_choice',
            label: 'Promueve la participación de los miembros del Consejo Directivo.',
            rules: {
              required: true
            },
            answers: ['Nunca','Ocasionalmente','Algunas veces','Casi siempre','Siempre']
          },
          {
            name: 'A5',
            type: 'header',
            label: 'Planeación estratégica'
          },
          {
            name: 'A6',
            type: 'single_choice',
            label: 'Dirige al Colegio al logro de la visión y misión establecidos.',
            rules: {
              required: true
            },
            answers: ['Nunca','Ocasionalmente','Algunas veces','Casi siempre','Siempre']
          },
          {
            name: 'A7',
            type: 'single_choice',
            label: 'Involucra a todos los sectores de la comunidad escolar en el desarrollo de la visión de la escuela.',
            rules: {
              required: true
            },
            answers: ['Nunca','Ocasionalmente','Algunas veces','Casi siempre','Siempre']
          }
        ]
      })*/
    },
    render: function () {
      var self = this,
      $survey = $(_.template(surveyTemplate)());
		debugger;
	  $survey[2].click(function (){
			$(".cbp-vimenu").css("display","none");
			$("#imprime").css("display","none");
			window.print();
			$(".cbp-vimenu").css("display","initial");
			$("#imprime").css("display","initial");
		});
      $survey.find('.description').html(self.model.get('description'));
      $survey.find('.instructions').html(self.model.get('instructions'));
      $('body .container header h1').html(self.model.get('name'));
      self.$el.empty().append($survey);
      require(["views/forms/basicSurvey"], function(BasicSurvey) {
        var model = new Backbone.Model({}), arrFields = self.model.get('fields');
        model.fields = [];
        for(var i = 0; i < arrFields.length; i++) {
          if(arrFields[i].type == 0) {
            model.fields.push({
              'name': 'FIELD_' + i,
              'label': arrFields[i].name,
              'type': 'single_choice',
              'rules': {required: true},
              'answers': arrFields[i].answers.split('↵');
            });
          } else {
            model.fields.push({
              {
                'name': 'FIELD_' + i,
                'type': 'header',
                'label': arrFields[i].name
              }
            });
          }          
        }

        var surveyPage = Vm.create(appView, 'BasicSurvey', BasicSurvey, {model:model}),
        $form = surveyPage.render();
        $form.find('.form-horizontal').removeClass('form-horizontal')
        $form.find('.col-sm-2').removeClass('col-sm-2')
        $form.find('.col-sm-10').removeClass('col-sm-10')
        $survey.find('.container-survey').append($form);
      })
    }
  });
  return UsersPage;
});
