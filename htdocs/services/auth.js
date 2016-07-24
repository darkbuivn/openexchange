'use strict';

angular.module('Auth', ['Util'])
    .service('Auth', function($rootScope, $cookieStore, $q, $http, Constant) {
        var me = this,
            _ready = $q.defer(),
            _user = {},
            _username = "";

        me._setUser = function (userId, apiKey) {
            var url = Constant.BASE_URL + Constant.API.USER + "/" + userId + "?api_key=" + apiKey;
            $http.get(url)
                .then(function (res) {
                    if (angular.isObject(res.data)) {
                        _user = res.data;
                    }
                })
                .finally(function () {
                    _ready.resolve();
                });
        };

        // Init
        if (localStorage.hasOwnProperty('EQO_UserID')) {
            var userId = localStorage.getItem('EQO_UserID'),
                apiKey = localStorage.getItem('EQO_APIKey');

            me._setUser(userId, apiKey);
        } else {
            _ready.resolve();
        }

        /**
         * Login
         *
         * @param user
         * @returns {promise}
         */
        me.login = function(user) {
            var deferred = $q.defer(),
                params = "Basic " + btoa(user.username + ":" + user.pwd),
                url = Constant.BASE_URL + Constant.API.LOGIN + "?Authorization=" + encodeURIComponent(params);

            $http.post(url)
                .then(function(res) {
                    var data = res.data.data;
                    if (data.authorization) {
                        localStorage.setItem('EQO_Authorization', data.authorization);
                        localStorage.setItem('EQO_APIKey', data.api_key);
                        localStorage.setItem('EQO_UserID', '{8cf8b569-6313-46b7-860b-72c3c0456c85}');
                       me._setUser('{8cf8b569-6313-46b7-860b-72c3c0456c85}', data.api_key);
                        deferred.resolve();
                    } else {
                        deferred.reject(data);
                    }
                })
                .catch(function(err) {
                    deferred.reject(err.data);
                });
            return deferred.promise;
        };

        /**
         * Logout
         */
        me.logout = function() {
            localStorage.clear();
            _user = {};
        };

        /**
         * Check if the user is logged
         *
         * @returns {boolean}
         */
        me.isLogged = function() {
            /*return _user.hasOwnProperty('id');*/
            if (localStorage.getItem('EQO_Authorization')) {
                return true;
            } else {
                return false;
            }
        };

        /**
         * Check if the user is logged after the ready state
         *
         * @returns {Promise}
         */
        me.isReadyLogged = function() {
            var def = $q.defer();
            _ready.promise.then(function() {
                if (localStorage.getItem('EQO_Authorization')) {
                    def.resolve();
                } else {
                    def.reject();
                }
            });
            return def.promise;
        };

        /**
         * Returns the user
         *
         * @returns {object}
         */
        me.getUser = function() {
            return _user;
        };

    });
