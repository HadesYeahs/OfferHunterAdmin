define([
  'views/forms/basicForm',
  'text!templates/forms/inlineForm.html',
], function(BasicForm, formBasicTemplate){
  var DashboardPage = BasicForm.extend({
    tagName: 'div',
    el:'',
    type:'basicSurvey',
    events: {
      'click button[type="submit"].detail': 'submit',
      'click button.btn-cancel.detail': 'cancel'
    },
    renderTitle: function() {
    },
    loadTemplate: function() {
      var self = this;
      self.$el.empty().append($(_.template(formBasicTemplate)({modelName: self.model.name})));
    },
    saveData: function(myData) {
      var self = this, bNotSave = false;
      self.model.set(myData);
      if(self.collection) {
        self.collection.add(self.model);
        self.setIdModel();
      }
      if(self.model.parents) {
        for(var i = 0; i < self.model.parents.length; i++) {
          if(self.model.get(self.model.parents[i].foreign_key['id']) > 0) {
            bNotSave = false; break;
          }
          bNotSave = true;
        }
      }
      if(!bNotSave) self.model.save();
      if(self.collection) self.model = new self.options.collection.model();
    },
    closeForm: function() {
      var self = this;
      self.$el.parent().hide();
      self.$el.parent().siblings('.containerButtonAdd').show();
    },
    hideButtons: function() {
      var self = this;
      self.$el.find('button[type="submit"].detail').hide();
      self.$el.find('button.btn-cancel.detail').hide();
    }
  });
  return DashboardPage;
});
