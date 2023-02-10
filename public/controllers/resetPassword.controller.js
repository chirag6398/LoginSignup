///<reference path="../module/module.js"/>
///<reference path="../services/signup.service.js"/>

app.controller("resetpasswordController",["$scope","$http","$location","userHandler","$stateParams",function($scope,$http,$location,userHandler,$stateParams){
    $scope.btnText="change";
    $scope.disabledFlag=false;
    console.log($stateParams.resetToken);

    submitHandler=function (){
        $scope.btnText="wait";
        console.log($scope.rsp);
        if($scope.rsp.password!=$scope.rsp.cpassword){
            alert("password doesnot match confirm password")
            return;
        }
        var data={
            ...$scope.rsp,
            token:$stateParams.resetToken
        }
        userHandler.resetPassword($http,$location,data,function(result){
            if(result.status==200){
                $scope.btnText="done";
                $location.path(["./login.html"]);
            }else{
                $scope.btnText="oops sorry try again later";
            }
        })
    }
    
}]);