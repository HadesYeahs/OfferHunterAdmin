define([
  'jquery',
  'lodash',
  'backbone',
  'vm'/*,
  'text!templates/manager/page.html'*/
], function($, _, Backbone, Vm, managerPageTemplate){
  var ConfigurationPage = Backbone.View.extend({
    el: '.main',
    render: function () {
      $('body .container header h1').html('Configuration');
      this.$el.html('configuration');
    },
    events: {
      
    }
  });
  return ConfigurationPage;
});
