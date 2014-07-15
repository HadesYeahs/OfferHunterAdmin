define([
  'views/forms/basicForm'
], function(BasicForm){
  var DashboardPage = BasicForm.extend({
    tagName: 'div',
    el:'',
    type:'basicSurvey',
    events: {
      'click button[type="submit"]': 'submit',
      'click button.btn-cancel': 'cancel'
    },
    render: function () {
      var self = this;
      self.loadTemplate();
      self.renderForm();
      return self.$el;
    },
    submit: function(){
      var self = this;
      if(!self.$el.find('form').valid()) return;

      var myData = self.$el.find('form').serializeObject();
      self.model.urlRoot = 'SurveyResults';
      self.model.set(myData);
      self.model.save();

      Backbone.history.navigate('dashboard', { trigger : true });

      return false;
    },
    cancel: function() {
      window.history.back();
    }
  });
  return DashboardPage;
});
