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
      self.$el.empty().append($(_.template(Template)({})));
      self.renderTitle();
      self.$el.find('[name="selectuser"]').select2({query: function(query){
        $.ajax('users', {
          timeout:180000
        }).then(function(response) {
          var data = {results: []};
          $.each(response, function(i, item) {
            if(query.term.length == 0 || this.text.toUpperCase().indexOf(query.term.toUpperCase()) >= 0 ){
              data.results.push({id: item['id'], text: item['email'] });
            }
          });     
          query.callback(data);             
        })
      }}).on('change', function() {
        var aValue = this.value;
        $.get('reporter/' + aValue).then(function(res){
          for(var i = 0; i < res.length; i++) {
            var data = {
              labels: [], 
              datasets: [
                {
                  fillColor : "rgba(220,220,220,0.5)",
                  strokeColor : "rgba(220,220,220,1)",
                  pointColor : "rgba(220,220,220,1)",
                  pointStrokeColor : "#fff",
                  data : []
                }
              ]
            };
            
            for(var x = 0; x < res[i].fields.length; x++) {
              data.labels.push(res[i].fields[x].label);
              data.datasets[0].data.push(res[i].fields[x].value);
            }

            self.renderChart(res[i].name, data);
          }
        }, function(){
          console.log('Error al obtener los datos para las graficas');
        })

      });
      
      
      return self.$el;
    },
    renderTitle: function() {
      $('body .container header h1').html('Reporte');
    },
    renderChart: function(name, data) {
      var self = this, $chartContent = $('<div/>'), $chart = $('<canvas id="myChart" width=800 height=400></canvas>');

      $chartContent.append($('<div/>').html(name));
      $chartContent.append($chart);

      //Get context with jQuery - using jQuery's .get() method.
      var ctx = $chart.get(0).getContext("2d");
      //This will get the first returned node in the jQuery collection.
      var myNewChart = new Chart(ctx).Line(data,{});

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
