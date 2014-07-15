define([
  'jquery',
  'lodash',
  'backbone',
  'text!templates/sucursal/sucursal.html',
  'libs/select2/select2.min'
], function($, _, Backbone,Template){
  var SucursalPage = Backbone.View.extend({
    tagName: 'div',
    el:'.main',
    initialize: function() {
      
    },
    events: {
      
    },
    render: function () {
      var self = this;
      $('body .container header h1').html('Ofertas');
	  self.$el.empty().append($(_.template(Template)({})));
	  self.$el.find('[name="selectuser"]').select2({query: function(query){
			$.ajax('cliente', {
				timeout:180000
			}).then(function(response) {
				var data = {results: []};
				$.each(response, function(i, item) {
					if(query.term.length == 0 || this.text.toUpperCase().indexOf(query.term.toUpperCase()) >= 0 ){
						data.results.push({id: item['id'], text: item['nombre'] });
					}
				});     
				query.callback(data);             
			})
		}}).on('change', function(){
			self.renderLists(this.value);
		});
	  return self.$el;
    },
	renderLists: function(id) {
		var self = this;
		self.$el.find(".formdiv").empty();
		self.collection.url = 'ofertacliente/'+self.$el.find('[name="selectuser"]').val();
		self.collection.fetch({        
        success: function() {
          require(["libs/widgets/widget.table"], function(){
            var tUsers = $('<div/>').table({
              btnNew: 'oferta/add',
              columns:[
                {name:'descripcion', label:'Descripcion'},
				{name:'vigencia_app', label:'Desde'},
				{name:'vigencia_cer', label:'Hasta'}
              ],
              url:null,
			  type:"inline",
              collection:self.collection
            });
            self.$el.find(".formdiv").empty().append(tUsers);
          })
        },
        error: function() {
          console.log('No se pudo cargar la collecion Clientes');
        }
      })
	}
  });
  return SucursalPage;
});
