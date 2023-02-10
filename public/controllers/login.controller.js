///<reference path="../module/module.js"/>
///<reference path="../services/signup.service.js"/>

app.controller("loginController",["$scope","$http","$location","userHandler",function($scope,$http,$location,userHandler){
    $scope.disabledFlag=false;
    $scope.buttonText="login";
    $scope.submitHandler=function($event){

        $event.preventDefault();
        $scope.disabledFlag=true;
        $scope.buttonText="processing";
        
        userHandler.postLogIn($http,$location,$scope.signIn,function(result){
            if(result.status==200){
                $scope.buttonText="successfull";
                window.localStorage.setItem("Authorization","Bearer "+result.token);
                // $location.path(["./home.html"]);
                // console.log(result.token);
            }else if(result.status==401){
                console.log(result);
                $scope.disabledFlag=false;
                $scope.buttonText="retry";

            }else{
                console.log(result);
                $scope.disabledFlag=true;
                $scope.buttonText="try later";
            }
            

            
            
        });
        
    }
}]);