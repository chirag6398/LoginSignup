var userModel=require("../models/user.model");
var validation=require("../services/validation.service");
var mailHandlers=require("../services/sendMails.service");

module.exports={
    signUpHandler:function(req,res,next){
        
        var valid=validation.validateSignUpData(req,res);
        
        if(valid){
            var user=new userModel({username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    fname:req.body.fname,
                    lname:req.body.lname,
                    number:req.body.number
                });

            user.save()
                .then(function(result){
                   
                    return res.status(200).send({message:"user signup successful",data:result});
                }).catch(function(err){
                    
                    return res.status(400).send({message:"user email/username exists",error:err});
                });
        }

    },
    logInHandler:function(req,res){
        
        var user=req.user._doc;

        mailHandlers.sendWelcomeMailHandler(user);
        
       
        return res.status(200).send({message:"user logged in successful",data:user,token:req.user.token});
    },
    getUser:function(req,res){
        console.log("user",req.user);
        return res.send({message:"working"})
    },
    forgetPasswordHandler:function(req,res){
        if (req.body.email) {
            
            userModel.findOne({email:req.body.email}).then(function(user){
                user.generateResetToken();
                console.log(user);
                user.save()
                    .then((result) => {
                    mailHandlers.sendResetMailHandler(result);

                    return res
                        .status(200)
                        .send({ message: "check your mail", status: 200 });
                    })
                    .catch((err) => {
                    console.log("result not saved", err);
                    return res
                        .status(500)
                        .send({ error: "internal error", status: 500 });
                    });

            }).catch((err) => {
                console.log("user not found", err);
                return res
                  .status(401)
                  .send({ error: "unauthorized user", status: 401 });
              });

        }
    },
    resetPassword:function(req,res){
        if(req.body.password===req.body.cpassword){
            userModel.findOne({resetToken:req.body.token}).then(function(user){
                user.resetToken = undefined;
                user.expireToken = undefined;
                user.password=req.body.password;
                console.log(user);
                user.save().then(function(user){
                    console.log(user);
                    return res.status(200).send({status:200,message:"user password updated successfully"})
                }).catch(function(err){
                    console.log(err);
                    return res.status(500).send({status:500,message:"internal server error"})
                })
            }).catch(function(err){
                console.log(err);
                return res.status(300).send({status:300,message:"token expires"});
            });
        }
        
    }
    
}