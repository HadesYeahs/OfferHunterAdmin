// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  shim: {
    jquery: {
      deps: ['bootstraplibs']
    },
    bootstraplibs: {
      deps: ['jquerylibs']
    },
    routefilter: {
      deps: ['backbone']
    }
  },
  paths: {
    // Major libraries
    jquery: 'libs/jquery/jquery-ui-min',
    jquerylibs: 'libs/jquery/jquery-min',
    bootstraplibs: 'vendor/bootstrap.min',
    routefilter: 'libs/backbone/backbone.routefilter.min',
    underscore: 'libs/underscore/underscore-min', // https://github.com/amdjs
    lodash: 'libs/lodash/lodash', // alternative to underscore
    backbone: 'libs/backbone/backbone-min', // https://github.com/amdjs
    sinon: 'libs/sinon/sinon.js',
	uploader: 'libs/uploader/fileuploader',
	timepicker:"libs/time/jquery.timepicker",
    // Require.js plugins
    text: 'libs/require/text',

    // Just a short cut so we can put our html outside the js dir
    // When you have HTML/CSS designers this aids in keeping them out of the js directory
    templates: '../templates'
  }

});

// Let's kick off the application

require([
  'backbone',
  'views/app',
  'router',
  'vm',
  'libs/misc/utils'
], function(Backbone, AppView, Router, Vm){
  window.appView = Vm.create({}, 'AppView', AppView);
  appView.render();
  Router.initialize({appView: appView});  // The router now has a copy of all main appview
});
