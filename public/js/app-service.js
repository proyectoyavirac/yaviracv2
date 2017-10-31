var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'ctrlHome',
            access: { restricted: false }
        })
        .when('/documentation', {
            templateUrl: 'views/documentation.html',
            controller: 'ctrlDocumentation',
            access: { restricted: true }
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ctrlContact',
            access: { restricted: false }
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
        })
        .when('/Python', {
            templateUrl: 'views/python.html',
            access: { restricted: false }
        })
        .when('/Ruby', {
            templateUrl: 'views/ruby.html',
            access: { restricted: false }
        })
        .when('/C Sharp', {
            templateUrl: 'views/informacion.html',
            access: { restricted: false }
        })
        .when('/Java', {
            templateUrl: 'views/java2.html',
            access: { restricted: false }
        })
        

    $routeProvider.otherwise('/home');
});


myApp.factory('AuthService', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {

    authservice = {}

    // create user variable
    var user = null;

    authservice.isLoggedIn = function () {
        if (user) {
            return true;
        } else {
            return false;
        }
    }

    authservice.getUserStatus = function () {
        return user;
    }

    authservice.login = function (name, id, password) {
        console.log('authservice.login');

        // create a new instance of deferred
        var deferred = $q.defer();
        var local = {
            name: name,
            id: id,
            password: password
        }


        // send a post request to the server
        $http.post('http://localhost:3333/api/user', local)
            // handle success // test for success
            .then(function success(data, status) { // note to mherman: angular docs say .success method has been deprecated and to use .then https://docs.angularjs.org/api/ng/service/$http
                console.log('data', data);
                if (status === 200 && data.status) {
                    user = true;
                    deferred.resolve();
                } else {
                    user = false;
                    deferred.reject();
                }
            })
            // handle error
            .then(function error(data) {
                user = false;
                deferred.reject();
            });

        // return promise object
        return deferred.promise;

    };

    authservice.logout = function () {

        // create a new instance of deferred
        var deferred = $q.defer();

        // send a get request to the server
        $http.get('/user/logout')
            // handle success
            .then(function success(data) {
                user = false;
                deferred.resolve();
            })
            // handle error
            .then(function error(data) {
                user = false;
                deferred.reject();
            });

        // return promise object
        return deferred.promise;

    };

    authservice.register = function (name, id, password) {

        // create a new instance of deferred
        var deferred = $q.defer();

        console.log('hello from authservice.register');
        var local = {
            name: name,
            id: id,
            password: password
        }
        console.log(local);
        // send a post request to the server
        $http.post('http://localhost:3333/api/user', { local })    // handle success
            .then(function success(data, status) {
                console.log('hello!');
                console.log('data', data);
                if (status === 200 && data.status) {
                    deferred.resolve();
                    window.location.href = '/login';
                } else {
                    deferred.reject();
                }
            })
            // handle error
            .then(function error(data) {
                deferred.reject();
            });

        // return promise object
        return deferred.promise;

    }
    return authservice;
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
    $scope.imgsCard = [{ img: "java.png", label: "java" },
    { img: "c-sharp.png", label: "c-sharp" },
    { img: "python.png", label: "python" },
    { img: "ruby.png", label: "ruby" },
    { img: "javascript.png", label: "javascript" }
    ];
});

myApp.controller('ctrlContact', function ($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});

myApp.controller('ctrlLogin', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {

    console.log(authservice.getUserStatus());

    $scope.login = function () {
        console.log('hi from login');
        // initial values
        $scope.error = false;
        $scope.disabled = true;

        // call login from service
        authservice.login($scope.loginForm.username, $scope.loginForm.password)
            // handle success
            .then(function () {
                $location.path('/');
                $scope.disabled = false;
                $scope.loginForm = {};
            })
            // handle error
            .catch(function () {
                $scope.error = true;
                $scope.errorMessage = "Invalid email and/or password";
                $scope.disabled = false;
                $scope.loginForm = {};
            });

    };

}]);

myApp.controller('logoutController', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {

    $scope.logout = function () {

        console.log(authservice.getUserStatus());

        // call logout from service
        authservice.logout()
            .then(function () {
                $location.path('/login');
            });

    };

}]);

myApp.controller('ctrlRegister',
    ['$scope', '$location', 'AuthService',
        function ($scope, $location, AuthService) {

            console.log(authservice.getUserStatus());

            $scope.register = function () {

                // initial values
                $scope.error = false;
                $scope.disabled = true;

                // call register from service
                
                authservice.register($scope.local.name, $scope.local.id, $scope.local.password)
                    
                // handle success

                    .then(function () {
                        $location.path('/login');
                        $scope.disabled = false;
                        $scope.local = {};
                    })

                    $location.path('/login');
                // h

            };

        }]);
