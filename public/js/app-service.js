var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'ctrlHome',
            access: { restricted: true }
        })
        .when('/documentation', {
            templateUrl: 'views/documentation.html',
            controller: 'ctrlDocumentation'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ctrlContact'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'ctrlLogin',
            access: { restricted: false }
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'ctrlRegister',
            access: { restricted: false }
        })
        .when('/logout', {
            controller: 'logoutController',
            access: { restricted: true }
        });

    $routeProvider.otherwise('/home');
});

myApp.run(function ($rootScope, $location, $route, AuthService) {
    $rootScope.$on('$routeChangeStart',
        function (event, next, current) {
            AuthService.getUserStatus()
                .then(function () {
                    if (next.access.restricted && !AuthService.isLoggedIn()) {
                        $location.path('/login');
                        $route.reload();
                    }
                });
        });
});

myApp.factory('AuthService',
    ['$q', '$timeout', '$http',
        function ($q, $timeout, $http) {

            // create user variable
            var user = null;

            // return available functions for use in the controllers
            return ({
                isLoggedIn: isLoggedIn,
                getUserStatus: getUserStatus,
                login: login,
                logout: logout,
                register: register
            });

            function isLoggedIn() {
                if (user) {
                    return true;
                } else {
                    return false;
                }
            }

            function getUserStatus() {
                return $http.get('/user/status')
                    // handle success
                    .success(function (data) {
                        if (data.status) {
                            user = true;
                        } else {
                            user = false;
                        }
                    })
                    // handle error
                    .error(function (data) {
                        user = false;
                    });
            }

            function login(password, email) {

                // create a new instance of deferred
                var deferred = $q.defer();

                // send a post request to the server
                $http.post('/user/login',
                    { email: email, password: password })
                    // handle success
                    .success(function (data, status) {
                        if (status === 200 && data.status) {
                            user = true;
                            deferred.resolve();
                        } else {
                            user = false;
                            deferred.reject();
                        }
                    })
                    // handle error
                    .error(function (data) {
                        user = false;
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;

            }

            function logout() {

                // create a new instance of deferred
                var deferred = $q.defer();

                // send a get request to the server
                $http.get('/user/logout')
                    // handle success
                    .success(function (data) {
                        user = false;
                        deferred.resolve();
                    })
                    // handle error
                    .error(function (data) {
                        user = false;
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;

            }

            function register(username, password, email) {

                // create a new instance of deferred
                var deferred = $q.defer();

                // send a post request to the server
                $http.post('/user/register',
                    { username: username, password: password, email: email })

                    // handle success
                    .success(function (data, status) {
                        if (status === 200 && data.status) {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    })
                    // handle error
                    .error(function (data) {
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;

            }

        }]);

myApp.controller('ctrlHome', function ($scope) {

    $scope.imgsCarusel = [{ img: "blanconinja.png", css: "carousel-item active" },
    { img: "cuadernoespe.svg", css: "carousel-item" },
    { img: "background.jpg", css: "carousel-item" }
    ];
    $scope.imgsCard = [{ img: "java.png", label: "java" },
    { img: "c-sharp.png", label: "c-sharp" },
    { img: "python.png", label: "python" },
    { img: "ruby.png", label: "ruby" },
    { img: "javascript.png", label: "javascript" }
    ];
});

myApp.controller('ctrlDocumentation', function ($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});

myApp.controller('ctrlContact', function ($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});

myApp.controller('ctrlLogin',
    ['$scope', '$location', 'AuthService',
        function ($scope, $location, AuthService) {

            $scope.login = function () {

                // initial values
                $scope.error = false;
                $scope.disabled = true;

                // call login from service
                AuthService.login($scope.loginForm.password, $scope.loginForm.email)
                    // handle success
                    .then(function () {
                        $location.path('/');
                        $scope.disabled = false;
                        $scope.loginForm = {};
                    })
                    // handle error
                    .catch(function () {
                        $scope.error = true;
                        $scope.errorMessage = "Invalido email y/o contraseña";
                        $scope.disabled = false;
                        $scope.loginForm = {};
                    });

            };

        }]);

myApp.controller('ctrlRegister',
    ['$scope', '$location', 'AuthService',
        function ($scope, $location, AuthService) {

            $scope.register = function () {

                // initial values
                $scope.error = false;
                $scope.disabled = true;

                // call register from service
                AuthService.register($scope.registerU.username, $scope.registerU.password, $scope.registerU.email)
                    // handle success
                    .then(function () {
                        $location.path('/users/login');
                        $scope.disabled = false;
                        $scope.registerU = {};
                    })
                    // handle error
                    .catch(function () {
                        $scope.error = true;
                        $scope.errorMessage = "Algo salió mal!";
                        $scope.disabled = false;
                        $scope.registerU = {};
                    });

            };

        }]);

myApp.controller('logoutController',
    ['$scope', '$location', 'AuthService',
        function ($scope, $location, AuthService) {

            $scope.logout = function () {

                // call logout from service
                AuthService.logout()
                    .then(function () {
                        $location.path('/login');
                    });

            };

        }]);