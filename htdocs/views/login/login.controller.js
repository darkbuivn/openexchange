'use strict';

angular.module('LoginController', [])
  .controller('LoginCtrl', function (Constant, $cookieStore, $location, Auth, $state, $rootScope, usSpinnerService) {
    var vm = this;
    angular.extend(vm, {

      name: 'LoginCtrl',
      user: {username: "admin@printer.com", pwd: "changeme"},
      error: '',

      /**
       * Login method
       */
      onLogin: function () {
        usSpinnerService.spin('spinner-login');
        Auth.login(vm.user)
          .then(function () {
            usSpinnerService.stop('spinner-login');
            $rootScope.loginClass = '';
            $rootScope.APIKey = localStorage.getItem('EQO_APIKey');
            $location.path('/job');
            localStorage.setItem('username', vm.user.username);
          })
          .catch(function (err) {
            usSpinnerService.stop('spinner-login');
            vm.error = 'Username or password is incorrect!';
          });
      }

    });

    if (Auth.isLogged()) {
      $state.go('job');
    } else {
      $rootScope.loginClass = 'login';
    }
    $rootScope.spinner = {active: false};
    //vm.onLogin();
  });
