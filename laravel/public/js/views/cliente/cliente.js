define([
  'jquery',
  'lodash',
  'backbone'/*,
  'text!templates/optimize/page.html'*/
], function($, _, Backbone, optimizePageTemplate){
  var ClientePage = Backbone.View.extend({
    el: '.main',
    initialize: function(){
      
    },
    render: function () {
      var self = this;
      $('body .container header h1').html('Clientes');
      self.collection.url = 'cliente'
      self.collection.fetch({        
        success: function() {
          require(["libs/widgets/widget.table"], function(){
            var tUsers = $('<div/>').table({
              btnNew: 'cliente/add',
              columns:[
                {name:'logo', label:'Logo'},
				{name:'nombre', label:'Nombre'}
              ],
              url:null,
              collection:self.collection
            });
            self.$el.empty().append(tUsers);
          })
        },
        error: function() {
          console.log('No se pudo cargar la collecion Clientes');
        }
      })
    }
  });
  return ClientePage;
});
