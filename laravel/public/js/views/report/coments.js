define([
  'jquery',
  'lodash',
  'backbone',
  'text!templates/report/coments.html',
  'libs/select2/select2.min',
  'libs/print/jquery.PrintArea'
], function($, _, Backbone, Template){
  var OportunitiesView = Backbone.View.extend({
    tagName: 'div',
    el:'',
    initialize: function() {
      
    },
    events: {
      
    },
    render: function() {
		var self = this;
		self.renderTitle();
		self.$el.empty().append($(_.template(Template)({})));
		self.$el.find("#imprime").click(function (){
			var x = $(".container").clone();
			x.find(".cbp-vimenu").remove();
			x.find("#imprime").remove();
			x.printArea();
		});
		self.$el.find('[name="selectuser"]').select2({query: function(query){
			$.ajax('users', {
				timeout:180000
			}).then(function(response) {
				var data = {results: []};
				$.each(response, function(i, item) {
					if(query.term.length == 0 || this.text.toUpperCase().indexOf(query.term.toUpperCase()) >= 0 ){
						data.results.push({id: item['id'], text: item['name'] });
					}
				});     
				query.callback(data);             
			})
		}}).on('change', function(){
			self.renderLists(this.value);
		});
		
		return self.$el;
    },
    
	renderTitle: function() {
      $('body .container header h1').html('Comentarios');
    },
	
	renderLists: function(id) {
		var self = this;
		self.$el.find('.tableContent').empty();
		$.get('reporterTwo/' + 0 + '/' + id).then(function(res){
			for (key in res)
			{
				self.$el.find('.tableContent').append(self.renderList(res[key]));
			}
		}, function(){ console.log('Error al cargar comentarios')});
	},
	
	renderList: function(data) {
		$list = $('<ul/>', {'class':'listOportunities'});
		$list.append('<li>'+ data.nombre +'</li>');
		for (key in data.comentarios) {
			var ul = $('<li/>').html(data.comentarios[key]);
			$list.append(ul);
			
		}
		return $list;
	}
  });
  return OportunitiesView;
});
