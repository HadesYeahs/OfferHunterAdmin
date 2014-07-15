define([
  'jquery',
  'lodash',
  'backbone',
  'text!templates/login/login.html'
], function($, _, Backbone, Template){
  var ModalPage = Backbone.View.extend({
    tagName: 'div',
    initialize: function() {
      var self = this;
    },
    events: {
      'click button[type="submit"]': 'submit'
    },
    render: function () {
      var self = this;
      self.$el.empty().append($(_.template(Template)({})));
      self.$el.find(".alert").alert().hide();
      return self.$el;
    },
    submit: function() {
      var self = this, sUser = self.$el.find('[name="user"]').val();
      var sPassword = self.$el.find('[name="password"]').val();
      $.post(self.$el.find('form').attr('action'), {user: sUser, password: sPassword }).then(function(res){
        if(!$.isPlainObject(res) || res == 'false') {
          console.log('Usuario invalido');
          self.$el.find(".alert").show().bind('closed.bs.alert', function () {
            self.$el.find('[name="user"]').val('');
            self.$el.find('[name="password"]').val('');
          });
          return;
        }
        //autentificacion correcta
        appView.setUser(res);
        appView.render();
        if(appView.user.get('type') == 1) {
          Backbone.history.navigate('mysurveys', { trigger : true });
        } else {
          Backbone.history.navigate('dashboard', { trigger : true });
        }
      }, function() {
        console.log('Error al autentificar el usuario')
      })
      return false
    }
  });
  return ModalPage;
});
