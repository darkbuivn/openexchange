angular.module('openEx')
.directive('header', function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/header/header.html'
  };
});