define([
  'jquery',
  'lodash',
  'backbone',
  'text!templates/oportunities/oportunities.html',
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
      $('body .container header h1').html('Areas de oportunidad');
    },
	
	renderLists: function(id) {
		var self = this;
		self.$el.find('.tableContent').empty();
		$.get('reporterTwo/' + id).then(function(res){
			for(var i = 0; i<res.length; i++) {
				self.$el.find('.tableContent').append(self.renderList(res[i]));
			}
		}, function(){ console.log('Error al cargar oportunidades')});
	},
	
	renderList: function(data) {
		$list = $('<ul/>', {'class':'listOportunities'});
		$list.append('<li>'+ data.name +'</li>');
		for (key in data.fields) {
			var ul = $('<li/>').html(data.fields[key].label);
			if(data.fields[key].aOpor == "header")
			{
				ul.addClass('header');
			}
			else if(data.fields[key].aOpor)
			{
				ul.addClass('alarm');
				
			}
			var prom = Math.ceil(data.fields[key].prom)
			var span = $('<span/>').html("-Promedio: "+data.fields[key].prom);
			ul.append(span);
			for (key2 in data.fields[key].answers)
			{
				var span = $('<span/>').html("-   "+data.fields[key].answers[key2]);
				span.css("display","block");
				span.css("margin-left","5%");
				if(prom == key2)
				{
					//Sspan.addClass('alarmanswer');
					//span.css("background-color","wheat !important");
				}
				ul.append(span);
			}
			$list.append(ul);
			
		}
		return $list;
	}
  });
  return OportunitiesView;
});
