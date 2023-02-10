///<reference path="../services/signup.service.js"/>

var app=angular.module("myModule",["ui.router"]);

app.controller("mainController",["$scope","$http","userHandler",function($scope,$http,userHandler){
    
    $scope.data="hello";
    
    // userHandler.getUser($http,function(data){

        // $scope.data="hello"
    // })


}])