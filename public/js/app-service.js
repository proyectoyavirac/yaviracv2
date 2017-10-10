var app = angular.module('app-developers', ['ngRoute']);
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
mongoose.createConnection('mongodb://maflores4:maflores4@10.1.0.93:27017/testmaflores4?authSource=admin', {
    useMongoClient: true,
});


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
    
    $scope.getUsuario = function(){
		$http.get('/api/usuario/').then(function(response){
			$scope.usuario = response.data;
		});
	};
    
    $scope.addUsuario = function(){
		//var id = $routeParams.id;
		$http.post('/api/usuario/', $scope.usuario).then(function(response){
			//$scope.usuario = response.data;
			window.location.href = '/';
		});
	};
});

app.controller('ctrlContact', function ($scope) {
     
    $scope.getUsuario = function(){
		$http.get('/api/usuario/').then(function(response){
			$scope.usuario = response.data;
		});
	};
    
    $scope.addUsuario = function(){
		//var id = $routeParams.id;
		$http.post('/api/usuario/', $scope.usuario).then(function(response){
			//$scope.usuario = response.data;
			window.location.href = '/';
		});
	};
});

app.controller('ctrlLogin', function ($scope) {
   
    $scope.getUsuario = function(){
		$http.get('/api/usuario/').then(function(response){
			$scope.usuario = response.data;
		});
	};
    
    $scope.addUsuario = function(){
		//var id = $routeParams.id;
		$http.post('/api/usuario/', $scope.usuario).then(function(response){
			//$scope.usuario = response.data;
			window.location.href = '/';
		});
	};
});

app.controller('ctrlRegister', function ($scope) {
   
    $scope.getUsuario = function(){
		$http.get('/api/usuario/').then(function(response){
			$scope.usuario = response.data;
		});
	};
    
    $scope.addUsuario = function(){
		//var id = $routeParams.id;
		$http.post('/api/usuario/', $scope.usuario).then(function(response){
			//$scope.usuario = response.data;
			window.location.href = '/';
		});
	};
});