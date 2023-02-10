var mongoose=require("mongoose");
var bcrypt=require("bcrypt");
var crypt=require("crypto")

var userSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    lname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true,
    },
    resetToken:{
        type:String,
        required:false
    },
    expireToken:{
        type:Date,
        required:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

userSchema.pre('save',function(next){
    const user = this

    
        bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
            return next(saltError)
        } else {
            bcrypt.hash(user.password, salt, function(hashError, hash) {
            if (hashError) {
                return next(hashError)
            }

            user.password = hash
            next()
            })
        }
        })
    
});

// userSchema.post('save',function(){
//     console.log("post method",this);
// });

userSchema.methods.generateResetToken=function(){
    console.log("resettokengenerator",this);
    crypt.randomBytes(32, (err, buffer) => {
        if (err) {
          console.log(err);
        } else {
          this.resetToken = buffer.toString("hex");
          this.expireToken = Date.now() + 3600000;
        }
    });

}

module.exports=mongoose.model("user",userSchema);

