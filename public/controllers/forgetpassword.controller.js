///<reference path="../module/module.js"/>
///<reference path="../services/signup.service.js"/>

app.controller("forgetpasswordController",["$scope","$http","$location","userHandler",function($scope,$http,$location,userHandler){
    $scope.btnText="send";
    $scope.disabledFlag=false;
    submitHandler=function(){
                // $event.preventDefault();

        $scope.btnText="processing";
        $scope.disabledFlag=true;

       userHandler.postForgetPassword($http,$location,$scope.fgp,function(result){
        if(result.status==200){
            $scope.btnText="successful";
            
            alert("check your mail inbox")
        }else if(result.status==500){
            $scope.btnText="try again later";
            $scope.disabledFlag=true;
        }else{
            $scope.btnText="retry";
            $scope.disabledFlag=false;
        }
       })
    }
}]);