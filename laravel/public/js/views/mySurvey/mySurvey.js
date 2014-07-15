define([
  'jquery',
  'lodash',
  'backbone'/*,
  'text!templates/dashboard/page.html'*/
], function($, _, Backbone, dashboardPageTemplate){
  var DashboardPage = Backbone.View.extend({
    el: '.main',
    render: function () {
      var self = this;
      $('body .container header h1').html('Encuestas pendientes');

      require(["libs/widgets/widget.table"], function(){
        console.log('surveys table');
        var tSurveys = $('<div/>').table({
          canAdd: false,
          canEdit: false,
          columns:[
            {name:'name', label:'Nombre'},
            {name:'puesto', label:'Puesto'},
            {name:'surveyName', label:'Encuesta'},
            {name:'url', label:'ver encuesta', type:'link'}
          ],
          url:'userusersurvey/' + appView.user.get('id')
        });
        self.$el.empty().append(tSurveys);
      });
    }
  });
  return DashboardPage;
});
