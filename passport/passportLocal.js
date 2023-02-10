var LocalStrategy=require("passport-local").Strategy;
var userModel=require("../models/user.model");
var bcrypt=require("bcrypt");
var jwt=require("jsonwebtoken")

module.exports={
    initializer:function(passport){


        passport.use(new LocalStrategy(function(username,password,next){
            
            
            userModel.findOne({email:username}).then(function(user){
                
                if(user){
                    
                    //verify password
                    bcrypt.compare(password,user.password).then(function(match){
                        if(match){
                            const token = jwt.sign({_id:user._id}, process.env.SECRET_KEY);
                            
                            console.log(token)
                            nuser={
                                ...user,
                                token
                            }
                            
                            next(null,nuser);
                            // next(null,user);
                        }else{
                            next(null,false,{message:"password is wrong"});
                        }
                    })
                    
                }else{
                    userModel.findOne({username:username})
                    .then(function(user){
                        // console.log("username");
                        if(user){
                            bcrypt.compare(password,user.password).then(function(match){
                                if(match){
                                    const token = jwt.sign({_id:user._id}, process.env.SECRET_KEY);
                                    
                                    console.log(token)
                                    nuser={
                                        ...user,
                                        token
                                    }
                                    
                                    next(null,nuser);
                                }else{
                                    // console.log("password false");
                                    next(null,false,{message:"password is wrong"});
                                }
                            })
                        }else{
                            next(null,false,{message:"user does not exist"});
                        }
                    })
                    .catch(function(err){
                        next(err)
                    });
                }
            }).catch(function(err){
                next(err);
            })

        }))
        // passport.serializeUser(function(user,next){
        //     return next(null,user._id);
        // });
        // passport.deserializeUser(function(_id,next){
        //     return userModel.findOne({_id:_id}).then(function(user){
        //         return next(null,user);
        //     })
            
        // });
        
    }

   
}