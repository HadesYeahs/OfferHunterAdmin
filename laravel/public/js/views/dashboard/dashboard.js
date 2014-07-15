define([
  'jquery',
  'lodash',
  'backbone'/*,
  'text!templates/dashboard/page.html'*/
], function($, _, Backbone, dashboardPageTemplate){
  var DashboardPage = Backbone.View.extend({
    el: '.main',
    initialize: function(){
      
    },
    render: function () {
      var self = this;
      $('body .container header h1').html('Usuarios');
      self.collection.url = 'users'
      self.collection.fetch({        
        success: function() {
          require(["libs/widgets/widget.table"], function(){
            var tUsers = $('<div/>').table({
              btnNew: 'users/add',
              columns:[
                {name:'name', label:'Nombre'},
				{name:'email', label:'eMail'}
              ],
              url:null,
              collection:self.collection
            });
            self.$el.empty().append(tUsers);
          })
        },
        error: function() {
          console.log('No se pudo cargar la collecion Users');
        }
      })
    }
  });
  return DashboardPage;
});
