'use strict';

angular.module('openEx', [
	'ngAnimate',
	'ngRoute',
	'ui.router',	
	'pascalprecht.translate'
])
 // config httpProvider
  .config(function ($locationProvider, $httpProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/', '/login');
    $urlRouterProvider.otherwise("/");
    //$locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  // define authInterceptor service
  .factory('authInterceptor',
  function ($rootScope, $q, $cookieStore, $location) {
    return {

      request: function (config) {
        config.headers = config.headers || {};
        if (localStorage.getItem('OE_Authorization')) {
          config.headers.Authorization = localStorage.getItem('OE_Authorization');
        }
        return config;
      },

      responseError: function (response) {
        if (response.status === 401) {
          $rootScope.Auth.logout();
          $location.path('/login');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }

    };
  })

  .run(function ($rootScope, $location, Auth, $state, $translate, $cookieStore) {
    $rootScope.Auth = Auth;
    $translate.use('ja');
    $rootScope.currentDate = new Date();
    if (localStorage.getItem('EQO_APIKey')) {
      $rootScope.APIKey = localStorage.getItem('EQO_APIKey');
    } else {
      $rootScope.APIKey = null;
    }
    $rootScope.$on('$stateChangeStart', function (event, next) {
      $rootScope.spinner = {active: true};
      if(!Auth.isLogged()) {
        $rootScope.headerLoginClass = 'header-login';
      } else {
        $rootScope.headerLoginClass = '';
      }
    });

  });

angular.module('HomeModule', ['HomeController', 'pascalprecht.translate']);
angular.module('HomeController', ['Util']);
angular.module('LoginController', []);
angular.module('Job.Controllers', ['ui.bootstrap']);
angular.module('Page.Controllers', []);
angular.module('DirectiveConfig', ['Util']);
angular.module('Util', ['pascalprecht.translate']);
angular.module('Auth', ['Util']);