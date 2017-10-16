var app = angular.module('app-developers', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'ctrlHome'
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
            controller: 'ctrlLogin'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'ctrlRegister'
        });

    $routeProvider.otherwise('/home');
});

app.factory('service', function ($http) {

});

app.controller('ctrlHome', function ($scope) {
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

app.controller('ctrlDocumentation', function ($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});

app.controller('ctrlContact', function ($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});

app.controller('ctrlLogin', function ($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});

app.controller('ctrlRegister', function ($scope, $route, $routeParams, $http) {

    $scope.getpersonas = function () {
        $http.get('/register').then(function (response) {
            $scope.personas = response.data;
        });
    };

    $scope.addpersonas = function () {
        var id = $routeParams.id;
       $http.post('/users/register', $scope.persona).then(function (response) {
          $scope.persona = response.data;
            window.location.href = '/';
        });
    };

    $scope.updatepersonas = function () {
        var id = $routeParams.id;
       $http.put('/users/register' + id, $scope.persona).then(function (response) {
            //$scope.persona = response.data;
            window.location.href = '/';
        });
    };

});