define([
  'jquery',
  'lodash',
  'backbone',
  'text!templates/report/report.html',
  'libs/chartjs/Chart.min',
  'libs/select2/select2.min'
], function($, _, Backbone, Template){
  var ReportView = Backbone.View.extend({
    tagName: 'div',
    el:'',
    initialize: function() {
      
    },
    events: {
      
    },
    render: function() {
		var self = this;
		var dataGraph = {
		labels: [], 
			datasets: [
				{
					fillColor : "rgba(0,0,255,0.5)",
					strokeColor : "rgba(151,187,205,1)",
					pointColor : "rgba(151,187,205,1)",
					pointStrokeColor : "#fff",
					data : []
				}
			]
		};
		self.$el.empty().append($(_.template(Template)({})));
		self.renderTitle();
		self.$el.find("#imprime").click(function (){
			$(".cbp-vimenu").css("display","none");
			$("#imprime").css("display","none");
			window.print();
			$(".cbp-vimenu").css("display","initial");
			$("#imprime").css("display","initial");
		});
		self.$el.find('[name="selectclient"]').select2({query: function(query){
			$.ajax('reporterTwo', {
			  timeout:180000
			}).then(function(response) {
			  var data = {results: []};
			  $.each(response, function(i, item) {
				if(query.term.length == 0 || this.text.toUpperCase().indexOf(query.term.toUpperCase()) >= 0 ){
				  data.results.push({id: item, text: item });
				}
			  });     
			  query.callback(data);             
			})
		}})
		self.$el.find('[name="selectsurvey"]').select2({query: function(query) {
			$.ajax('survey', {
				data:{
					timeout:180000
				}
			}).then(function(response){
				var data = {results: []};
				$.each(response, function(i, item) {
					if(query.term.length == 0 || this.text.toUpperCase().indexOf(query.term.toUpperCase()) >= 0 ) {
						data.results.push({id: item['id'], text: item['name'] });
					}
				});     
				query.callback(data); 
			})
		}}).on('change', function() {
			var aValue = this.value, url = 'reporter/'+ encodeURIComponent($('[name="selectclient"]').val()) +'/' + aValue;
			self.$el.find('[name="selectuser"]').select2('val', '');
			self.$el.find('.chartContent').empty();
			$.get(url).then(function(res){
				var data = $.extend(true, {}, dataGraph);
				for(var x = 0; x < res.fields.length; x++) {
					//data.labels.push('Pregunta ' + (x+1));
					data.labels.push(res.fields[x].label);
					data.datasets[0].data.push(res.fields[x].value);
				}
				self.renderChart(res.name, data,{});
			}, function(){
				console.log('Error al obtener los datos para las graficas');
				self.$el.find('.chartContent').empty();
			})

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
		}}).on('change', function() {
			var aValue = this.value;
			self.$el.find('[name="selectsurvey"]').select2('val', '');
			self.$el.find('.chartContent').empty();
			$.get('reporter/' + aValue).then(function(res){
				for(var i = 0; i < res.length; i++) {
					var data = $.extend(true, {}, dataGraph);
					for(var x = 0; x < res[i].fields.length; x++) {
						data.labels.push('Pregunta ' + (x+1));
						data.datasets[0].data.push(res[i].fields[x].value);
					}
					var Chartoptions = {
					 scaleOverlay: true,
					  scaleOverride: true,
					  scaleSteps: 10,
					  scaleStepWidth: .5,
					  scaleStartValue: 0
					};
					self.renderChart(res[i].name, data,Chartoptions);
				}
			}, function(){
				console.log('Error al obtener los datos para las graficas');
				self.$el.find('.chartContent').empty();
			})

		});
      
      
		return self.$el;
    },
    renderTitle: function() {
      $('body .container header h1').html('Reporte');
    },
    renderChart: function(name, data,Chartoptions) {
      var self = this, $chartContent = $('<div/>',{"style":"page-break-after:always;"}), $chart = $('<canvas id="myChart" width=800 height=400></canvas>');

      $chartContent.append($('<div/>').html(name));
      $chartContent.append($chart);

      //Get context with jQuery - using jQuery's .get() method.
      var ctx = $chart.get(0).getContext("2d");
      //This will get the first returned node in the jQuery collection.
      var myNewChart = new Chart(ctx).Line(data,Chartoptions);

      self.$el.find('.chartContent').append($chartContent);
    },
    renderTable: function(data) {
 /*     var data: [
        {}
      ];
      var self = this; $table = $('<table/>');
*/
    }
  });
  return ReportView;
});
