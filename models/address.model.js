var mongoose=require("mongoose");
var addressSchema=new mongoose.Schema({
    city:{
        type:String,
        required:true,
    },
    pincode:{
        type:String,
        required:true,
    },
    state:{
        type:String,
    },
    address:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    }
});

module.exports=mongoose.model("address",addressSchema);