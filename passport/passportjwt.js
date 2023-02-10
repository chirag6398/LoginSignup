// const { Strategy } = require("passport-local");

var JWTStrategy=require("passport-jwt").Strategy;
var ExtractJWT=require("passport-jwt").ExtractJwt;
var userModel=require("../models/user.model");

module.exports={
    initializer:function(passport){
        
        passport.use(new JWTStrategy({
            secretOrKey:process.env.SECRET_KEY,
            jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken()
        },function(jwt_payload,cb){
            
            userModel.findById({_id:jwt_payload._id}).then(function(user){
                if(user)
                    return cb(null,user);
                else
                    return cb(null,false);

            }).catch(function(err){
                return cb(err,false);
            });

            // console.log("hello")

            // return cb(null,false);
        }))
    }
}