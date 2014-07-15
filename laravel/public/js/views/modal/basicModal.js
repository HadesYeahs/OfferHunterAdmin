define([
  'jquery',
  'lodash',
  'backbone',
  'text!templates/modal/basicModal.html'
], function($, _, Backbone, Template){
  var ModalPage = Backbone.View.extend({
    tagName: 'div',
    initialize: function() {
      var self = this;
    },
    events: {
      
    },
    render: function () {
      var self = this;
      self.$el.empty().append($(_.template(Template)({modalTitle: self.options.modalTitle})));
      if($.isFunction(self.options.callback))
        self.$el.find('.btn.save').on('click', function() {
          self.options.callback();
        });
      return self.$el.find('.modal').modal();
    }
  });
  return ModalPage;
});
