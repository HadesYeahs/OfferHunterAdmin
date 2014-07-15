define([
  'jquery',
  'lodash',
  'backbone',
  'views/forms/field',
  'text!templates/forms/basicForm.html',
  'libs/misc/jquery.validate.min',
  'libs/select2/select2.min'
], function($, _, Backbone, FieldView, formBasicTemplate){
  var DashboardPage = Backbone.View.extend({
    tagName: 'div',
    type:'basicForm',
    arrCollectionsDetails: {},
    initialize: function() {
      var self = this;
      self.setIdModel();
    },
    events: {
      'click button[type="submit"].master': 'submit',
      'click button.btn-cancel.master': 'cancel'
    },
    render: function () {
      var self = this;
      self.loadTemplate();
      self.renderTitle();
      self.renderForm();
      self.renderDetails().then(function(){
        
      });
      self.buildEvents();
      return self.$el;
    },
    setIdModel: function() {
      var self = this;
      if(!this.model.id) this.model.id = parseFloat(this.model.cid.replace('c', '')) * -1;
      self.model.isNew = function (){return this.id < 0};
      self.model.set('id', self.model.id);
    },
    loadTemplate: function() {
      var self = this;
      self.$el.empty().append($(_.template(formBasicTemplate)({modelName: self.model.name})));
    },
    renderTitle: function() {
      $('body .container header h1').html('Form');
    },
    renderForm: function() {
      var self = this, $form = self.$el.find('form'), rules = {};
      for(var i=0; i<self.model.fields.length; i++) {
        rules[self.model.fields[i].name] = self.model.fields[i].rules;
        if(self.model.fields[i].type == 'collection') continue;
        $form.find('.fields').append(self.createField(self.model.fields[i]));
      }
      $form.validate({rules:rules,  highlight: function(element, errorClass) {$(element).parent().removeClass('fadeIn').removeClass('bounce').addClass('bounce')}})
      return $form;
    },
    renderDetails: function() {
      var self = this, arrFiles = ['libs/widgets/widget.table'], $details = self.$el.find('.details')
      dfd = $.Deferred(), self.arrCollectionsDetails = {};
      if(!self.model.details || self.model.details.length == 0) 
        return dfd.promise();

      for(var i=0; i<self.model.details.length; i++) {
        arrFiles.push('models/' + self.model.details[i].model)
      }
      require(arrFiles, function() {
        for(var i=0; i<self.model.details.length; i++) {
          var aModel = new arguments[i+1](), detail = aModel.views[self.model.details[i].view], foreignKey, ModelDetail = arguments[i+1];
          foreignKey = $.extend({}, self.model.details[i].foreign_key);
          for(var key in foreignKey) {
            if(foreignKey[key] == self.model.idAttribute) 
              foreignKey[key] = self.model.id;
            else
              foreignKey[key] = self.model.get(foreignKey[key]);
          }

          ModelDetail = ModelDetail.extend({
              defaults: _.extend({},ModelDetail.prototype.defaults, foreignKey)
          });

          var dataCollection = self.model.get(self.model.details[i].field) || [];

          self.arrCollectionsDetails[self.model.details[i].model] = new Backbone.Collection(dataCollection, {
            model: ModelDetail
          });
          var $table = $('<div/>').table({
            columns: detail.columns,
            type: (detail.type ? detail.type : 'default'),
            collection: self.arrCollectionsDetails[self.model.details[i].model],
            sortable: detail.sortable
          });
          $details.append($table);
          dfd.resolve();
        }        
      })
      return dfd.promise();
    },
    submit: function(){
      var self = this, myData = {};
      if(!self.$el.find('form[id="'+ self.model.name +'"]').valid()) return false;

      //myData = self.$el.find('form[id="'+ self.model.name +'"]').serializeObject();
      for(var i=0; i<self.model.fields.length; i++) {
        myData[self.model.fields[i].name] = self.$el.find('[name="'+ self.model.fields[i].name +'"]').value();
      }

      myData.id = self.model.id;
      self.saveData(myData);
      self.closeForm();
      return true;
    },

    saveData: function(myData) {
      var self = this;
      self.model.set(myData);
	  if(self.model.details)
	  {
		  for(var i=0; i<self.model.details.length; i++) {
			self.model.set(self.model.details[i].field, self.arrCollectionsDetails[self.model.details[i].model].toJSON());
		  }
	  }

      self.model.save();
    },

    closeForm: function() {
      var self = this;
      window.history.back();
    },

    cancel: function() {
      this.closeForm();
    },
    createField: function(aField) {
      var aFieldView = new FieldView({field:aField, type:this.type, value:this.model.get(aField.name)});
      return aFieldView.render();
    },
    buildEvents: function() {
      var self = this;
      for(var key in self.model.events) {
        var sEvent = key.split(':')[0], sField = key.split(':')[1];
        self.$el.find('[name="'+ sField +'"]').on(sEvent, {defEvent: self.model.events[key]}, function(e){
          self.executeEvent(e.data.defEvent, $(this).value());
        })
      }
    },
    executeEvent: function(defEvent, sValueSelect) {
      //si la definicion del evento tiene la propiedad SHOW
      if($.isPlainObject(sValueSelect)) {
        for(var key in sValueSelect) break;
        sValueSelect = sValueSelect[key];
      }
      if(defEvent.show) {
        for(var sValue in defEvent.show) {
          var sFunc = 'hide';
          if(sValue == sValueSelect) {
            //mostramos los campos
            sFunc = 'show'
          }
          for(var i in defEvent.show[sValue]) {
            $('[data-fieldgroup="'+ defEvent.show[sValue][i] +'"]')[sFunc]();
          }
        }
      }
    }
  });
  return DashboardPage;
});
