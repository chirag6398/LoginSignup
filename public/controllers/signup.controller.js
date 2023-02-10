///<reference path="../module/module.js"/>
///<reference path="../services/signup.service.js"/>

var invalid={
    color: "gray",
    opacity: "0.7"
   }
var valid={
    color: "green",
    opacity: "0.9"
   }
app.controller("signupController",["$scope","$location","$http","userHandler",function($scope,$location,$http,userHandler){
    $scope.cpasswordFalse=false;
    $scope.p1=true;
    $scope.p2=true;
    $scope.p3=true;
    $scope.p4=true;

     $scope.submitHandler=function($event){
   
        $event.preventDefault();
        var newUser={
            username:$scope.signin.username,
            email:$scope.signin.email,
            password:$scope.signin.password,
            number:$scope.signin.number,
            fname:$scope.signin.fname,
            lname:$scope.signin.lname,
            cpassword:$scope.signin.cpassword
            
        };
        
        userHandler.postSingUp($http,$location,newUser,function(result){
            console.log(result);
        });
       
     }

     $scope.matchPassword=function(val,val1){
       
        console.log(val,val1);
        $scope.cpasswordFalse=(val===val1);
     }

     $scope.passwordHandler=function(val){
   
        var regExLowerCase=/[a-z]/g;
        
        if(regExLowerCase.test(val)){
            $scope.c1=valid

            $scope.p1=false;
           
        }else{
           $scope.c1=invalid
           $scope.p1=true;
        }
    
        var regExUpperCase=/[A-Z]/g;
    
        if(regExUpperCase.test(val)){
            $scope.c2=valid
            $scope.p2=false;
           
        }else{
           $scope.c2=invalid
           $scope.p2=true;
        }
    
        var regExNumber=/[0-9]/g;
    
        if(regExNumber.test(val)){
            $scope.c3=valid
            $scope.p3=false;
           
        }else{
           $scope.c3=invalid
           $scope.p3=true;
        }

        if(val.length>=5 && val.length<=8){

            $scope.c4=valid
            $scope.p4=false;
           
        }else{
           $scope.c4=invalid
           $scope.p4=true;
        }
    }
}]);