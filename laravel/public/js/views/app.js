define([
  'jquery',
  'lodash',
  'backbone',
  'vm',
  'events',
  'models/user',
  'text!templates/layout.html'
], function($, _, Backbone, Vm, Events, User, layoutTemplate){
  var AppView = Backbone.View.extend({
    el: 'body',
    initialize: function () {

    },
    render: function () {
      var that = this;
      $(this.el).html(layoutTemplate);
      require(['views/header/menu'], function (HeaderMenuView) {
        var headerMenuView = Vm.create(that, 'HeaderMenuView', HeaderMenuView);
        headerMenuView.render();
      });
      require(['views/verticalmenu/menu'], function (HeaderVerticalMenuView) {
        var headerVerticalMenuView = Vm.create(that, 'HeaderVerticalMenuView', HeaderVerticalMenuView);
        headerVerticalMenuView.render();
        if(appView.user && appView.user.get('type') == 1) {
          headerVerticalMenuView.$el.find('.fa-users').remove();
          headerVerticalMenuView.$el.find('.fa-cogs').remove();
          headerVerticalMenuView.$el.find('.fa-comments-o').remove();
        }
      });    
    },
    setUser: function(data) {
      var self = this, aUser = new User();
      aUser.set(data);
      self.user = aUser;
    },
    isAuth: function() {
      return typeof appView.user == 'object';
    }
  });
  return AppView;
});
