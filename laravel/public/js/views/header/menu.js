define([
  'jquery',
  'lodash',
  'backbone',
  'text!templates/header/menu.html'
], function($, _, Backbone, headerMenuTemplate){
  var HeaderMenuView = Backbone.View.extend({
    el: '.main-menu',
    initialize: function () {
    },
    render: function () {
      $(this.el).html(headerMenuTemplate);
      $('a[href="' + window.location.hash + '"]').addClass('active');
    }
  })

  return HeaderMenuView;
});
