///<reference path="../module/module.js"/>

app.factory('userHandler',function(){
    
    var obj={};

    
    obj.postSingUp=function ($http,$location,data,cb){
        $http.post('http://localhost:5000/user/signup',data).then(function(response){
            
            cb(response);
        },function(err){
            console.log("user exist")
        });
    }

    obj.postLogIn=function ($http,$location,data,cb){
        $http.post('http://localhost:5000/user/login',data).then(function(response){
            
            cb({token:response.data.token,status:200});
        },function(err){
            console.log(err);
            if(err.status===401){
               
                cb({message:"please enter correct username and password",status:err.status})
            }else{
                
                cb({message:"please try againg later",status:500});

            }
            
        });
        

    }

    
    obj.postForgetPassword=function ($http,$location,data,cb){
        $http.post('http://localhost:5000/user/forgetpassword',data).then(function(response){
            
            console.log(response);
            cb({message:"check your inbox",status:200});
        },function(err){
            
            if(err.status==500){
                cb({message:"internal server error",status:500})
            }else{
                cb({message:"email does not exist",status:401});
            }
            
            
        });
    }

    obj.resetPassword=function ($http,$location,data,cb){
        $http.put('http://localhost:5000/user/resetpassword',data).then(function(response){
            
            console.log(response);
            cb({message:"password has been updated",status:200});
        },function(err){
            
            if(err.status==500){
                cb({message:"internal server error",status:500})
            }else{
                cb({message:"token expires",status:300});
            }
            
            
        });
    }
    

   
    return obj

    
})