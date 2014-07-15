// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
   'routefilter'
], function ($, _, Backbone, Vm) {
  var AppRouter = Backbone.Router.extend({
    history: [],
    routes: {
      // Pages admin
      'users': 'users',
      'dashboard': 'dashboard',
      'configuration': 'configuration',
      'comentarios': 'comentarios',
      'users/add': 'form',
      'cliente/add': 'form',
      'sucursal/add': 'form',
	  'oferta/add': 'form',
      'manager': 'manager',
      //pages mySurvey
      'cliente': 'cliente',
      'sucursal': 'sucursal',
      'oferta': 'oferta',
      //pages surveys
      'surveys/:name/:id/:id_user': 'showSurvey',
      'surveys/:name/:id': 'showSurvey',
      'login':'login',
      'report':'report',
	  'oportunities':'oportunities',
      // Default - catch all
      '*actions': 'defaultAction'
    },
    // Routes que necesitan autentificacion y si el usuario no esta autentificado lo mandamos a la pagina de login
    requresAuth : ['users', 'users/add', 'dashboard', 'configuration', 'survey/add', 'cliente','cliente/add', 'sucursal','sucursal/add','oferta','oferta/add', 'report', 'oportunities','comentarios'],
    // Routes que no son accesibles si el usuario esta autentificado
    preventAccessWhenAuth : ['#login'],
    before: function( route, params ) { 
      console.debug('before', route, params);
      //checamos si el usuario esta autentificado o no, despues revisamos si la ruta necesita autentificacion
      var isAuth = appView.isAuth();
      var path = Backbone.history.fragment;
      var needAuth = _.contains(this.requresAuth, path);
      var cancleAccess = _.contains(this.preventAccessWhenAuth, path);

      if(needAuth && !isAuth) {
        //Si el usuario entra a una pagina que requiere autentificacion lo mandamos a la pagina de login y guardamos el path para despues de logearse regrese a la pagina solicitada
        //Session.set('redirectFrom', path);
        console.debug('Rechazamos: ' + route)
        Backbone.history.navigate('login', { trigger : true });
        return false;
      } else if(isAuth && cancleAccess) {
        //El usuario esta autentificado e intenta entrar a pagina como login, entonces lo redireccionamos a la pagina home
        Backbone.history.navigate('', { trigger : true });
        return false;
      }
      //No hay ningun problema, le servimos la pagina que solicito
      console.debug('Servimos: ' + route)
      this.history.push({'route':route, 'params':params});
    },
    after: function( route, params ) { console.debug('after', route, params) },
    index: function() { console.debug('index') },
    page: function( route ) { console.debug('page', route) }
  });

  var initialize = function(options){
    var appView = options.appView;
    var router = new AppRouter(options);

    router.on('route:login', function() {
      require(['views/login/login'], function (LoginPage) {
        var loginPage = Vm.create(appView, 'LoginPage', LoginPage);
        $('body').empty().append(loginPage.render());
      });
    })

    router.on('route:oportunities', function() {
      require(['views/oportunities/oportunities'], function(OportunitiesView) {
        var oportunitiesView = Vm.create(appView, 'OportunitiesView', OportunitiesView);
        $('.main').empty().append(oportunitiesView.render());
      })
    })
	
	router.on('route:report', function() {
      require(['views/report/report'], function(ReportView) {
        var reportView = Vm.create(appView, 'ReportView', ReportView);
        $('.main').empty().append(reportView.render());
      })
    })

    router.on('route:users', function () {
      require(['views/users/users', 'models/user'], function (UsersPage, User) {
        var usersPage = Vm.create(appView, 'UsersPage', UsersPage, {collection: new Backbone.Collection([], {model: User})});
        usersPage.render();
      });
    });

    router.on('route:dashboard', function () {
      if(appView.user && appView.user.get('type') == 1) {
        Backbone.history.navigate('cliente', { trigger : true });
        return;
      }
      require(['views/dashboard/dashboard', 'models/cliente'], function (DashboardPage, cliente) {
        var dashboardPage = Vm.create(appView, 'DashboardPage', DashboardPage, {collection: new Backbone.Collection([], {model: cliente})});
        dashboardPage.render();
      });
    });

    router.on('route:cliente', function () {
      require(['views/cliente/cliente','models/cliente'], function (ClientePage, Cliente) {
        var ClientePage = Vm.create(appView, 'ClientePage', ClientePage, {collection: new Backbone.Collection([], {model: Cliente})});
        ClientePage.render();
      });
    });
	router.on('route:sucursal', function () {
      require(['views/sucursal/sucursal','models/sucursal'], function (SucursalPage, Sucursal) {
        var ClientePage = Vm.create(appView, 'SucursalPage', SucursalPage, {collection: new Backbone.Collection([], {model: Sucursal})});
        ClientePage.render();
      });
    });
	router.on('route:oferta', function () {
      require(['views/oferta/oferta','models/oferta'], function (OfertaPage, Oferta) {
        var ClientePage = Vm.create(appView, 'OfertaPage', OfertaPage, {collection: new Backbone.Collection([], {model: Oferta})});
        ClientePage.render();
      });
    });
    router.on('route:configuration', function () {
      require(['views/configuration/configuration'], function (ConfigurationPage) {
        var configurationPage = Vm.create(appView, 'ConfigurationPage', ConfigurationPage);
        configurationPage.render();
      });
    });
	
	router.on('route:comentarios', function() {
      require(['views/report/coments'], function(ComentView) {
        var comentView = Vm.create(appView, 'ComentView', ComentView);
        $('.main').empty().append(comentView.render());
      })
    })

    router.on('route:form', function() {
      var sModel = null;
      switch(Backbone.history.fragment) {
        case 'users/add': sModel = 'user'; break;
        case 'cliente/add': sModel = 'cliente'; break;
        case 'sucursal/add': sModel = 'sucursal'; break;
        case 'oferta/add': sModel = 'oferta'; break;
      }
      if(sModel == '') {
        //modelo invalido
        debugger;
      }
      require(['views/forms/basicForm', 'models/'+sModel], function(BasicFormPage, Model) {
        var basicFormPage = Vm.create(appView, 'BasicFormPage', BasicFormPage, {model: new Model()});
        $('.main').empty().append(basicFormPage.render());
      })
    });

    router.on('route:showSurvey', function(surveyName, id, id_user){
      console.log('Surveyname: ' + surveyName + ', id: ' + id);
      require(['views/survey/survey', 'models/survey'], function (SurveyPage, surveysModel) {
        var surveyPage = Vm.create(appView, 'SurveyPage', SurveyPage, {model: new surveysModel({id:id, id_user: id_user})});
        surveyPage.model.fetch({success: function(){
          surveyPage.render();
        }, error: function(){
          console.log('Error al obtener el modelo de la encuesta')
        }})
      });
    })

    Backbone.history.start({pushState: false, root: "/encuestas/surveys/public/"});
    $(document).on('click', 'a:not([data-bypass])', function (evt) {
      var href = $(this).attr('href');
      var protocol = this.protocol + '//';
      if (href && href.slice(protocol.length) !== protocol) {
        evt.preventDefault();
        console.debug('Naviate: ' + href)
        router.navigate(href, {trigger:true});
      }
    });
  };
  return {
    initialize: initialize
  };
});
