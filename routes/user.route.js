var userRoute=require("express").Router();
var userController=require("../controller/user.controller.js");
var passport=require("passport");
var passportLocal=require("../passport/passportLocal");
var passportJwt=require("../passport/passportjwt");

passportLocal.initializer(passport);
passportJwt.initializer(passport);



userRoute.post("/user/signup",userController.signUpHandler);
userRoute.post("/user/login",passport.authenticate('local',{session: false }),userController.logInHandler);
userRoute.post("/user/forgetpassword",userController.forgetPasswordHandler);
userRoute.put("/user/resetpassword",userController.resetPassword);
userRoute.get("/user/getUser",passport.authenticate('jwt',{session: false }),userController.getUser);




module.exports=userRoute;
























// ,failureMessage: true

// userRoute.get("/user/getAddress/:id",userController.getAddress);
// ,
//     getAddress:function(req,res){
        
//         userModel.find({_id:req.params.id},{addresses:1})
//         .populate("addresses")
//         .exec(function(err,result){
//              console.log(result)
//              res.status(200).json(result);
//         });


//         // userModel.find().then(function(result){
//         //     console.log(result);
//         // })
//         // var pipeline=[
//         //     {$match:{name:"darpan"}}
//         // ]
//         // userModel.aggregate(pipeline)
//         // .then(function(result){
//         //     console.log(result);
//         //     res.status(200).send(result);
//         // })
//         // .catch((function(err){console.log(err)}))
        
//     }