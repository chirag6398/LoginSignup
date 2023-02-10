///<reference path="../module/module.js"/>

app.config(function($stateProvider,$urlRouterProvider){
    $stateProvider.state('home',{
        url:'/home',
        templateUrl:'./views/home.html',
        controller:"homeController"
    })
    .state('login',{
        url:'/login',
        templateUrl:'./views/login.html',
        controller:"loginController"
    }).state('signup',{
        url:'/signup',
        templateUrl:'./views/signup.html',
        controller:"signupController"
    }).state('forgetPassword',{
        url:"/forgetPassword",
        templateUrl:'./views/forgetpassword.html',
        controller:"forgetpasswordController"
    }).state('resetPassword',{
        url:"/resetPassword/:resetToken",
        templateUrl:'./views/resetpassword.html',
        controller:"resetpasswordController"
    })

    $urlRouterProvider
    .when('/resetPassword/:resetToken', '/resetPassword/:resetToken')
    

    $urlRouterProvider.otherwise('/signup');
});
