'use strict'

angular.module('openEx')
  .factory('jobResource', ['$resource', 'Constant', function($resource, Constant) {
    return $resource(Constant.BASE_URL + Constant.API.JOB + '/:id', {}, {'load': { method:'GET' }});
  }])
  .factory('jobDetailResource', ['$resource', 'Constant', function($resource, Constant) {
    return $resource(Constant.BASE_URL + Constant.API.JOB + '/:id/detail', {}, {});
  }])
 .factory('jobCountResource', ['$resource', 'Constant', function($resource, Constant) {
    return $resource(Constant.BASE_URL + Constant.API.JOB_COUNT, {}, { 'getCount': { method:'GET' }});
  }])
  .factory('thumbResource', ['$resource', 'Constant', function($resource, Constant) {
    return $resource(Constant.BASE_URL + Constant.API.PAGE + '/[page_order]/thumb', {}, { 'load': { method:'GET' }});
  }])
  .factory('PageListResource', ['$resource', 'Constant', function($resource, Constant) {
    return $resource(Constant.BASE_URL + Constant.API.PAGE , {}, { 'load': { method:'GET' }});
  }])
  .factory('PageAssigneesResource', ['$resource', 'Constant', function($resource, Constant) {
    return $resource(Constant.BASE_URL + Constant.API.PAGE + '/assignment', {}, { 'load': { method:'GET' }});
  }])
  .factory('UserResource', ['$resource', 'Constant', function($resource, Constant) {
    return $resource(Constant.BASE_URL + Constant.API.USER + '/:user_id', {}, { 'load': { method:'GET' }});
  }]);