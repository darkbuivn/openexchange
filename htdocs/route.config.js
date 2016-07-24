'use strict';

angular.module('openEx')
.config(function ($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'components/login/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'vm'
    })
    .state('home', {
      url: '/home',
      templateUrl: 'components/home/home.html',
      controller: 'HomeCtrl',
      controllerAs: 'vm'
    })
    .state('job', {
      url: '/job',
      templateUrl: 'components/job/job.html',
      controller: 'JobController',
      controllerAs: 'vm'
    })
    .state('page', {
      url: '/job/:jobId/pages',
      templateUrl: 'components/page/page.html',
      controller: 'PageController',
      controllerAs: 'vm'
    })
    /*.state('job.list', {
      url: '/list',
      templateUrl: 'components/job/job.list.html',
      controller: 'JobListController',
      controllerAs: 'vm'
    })
    .state('job.thumbnail', {
      url: '/thumbnail',
      templateUrl: 'components/job/job.thumbnail.html',
      controller: 'JobThumbnailController',
      controllerAs: 'vm'
    })*/
});
