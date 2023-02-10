var addressModel=require("../models/address.model");
var userModel=require("../models/user.model");
module.exports={
    saveAddress:function(req,res,next){
        addressModel.deleteMany().then(function(result){console.log(result)});

        var address=new addressModel({
            city:req.body.city,
            address:req.body.address,
            pincode:req.body.pincode,
            user:req.body._id,
            state:req.body.state
        });

        address.save()
        .then(function(result){

            
            userModel.findOne({_id:req.body._id}).then(function(user){
                
                user.addresses.push(result._id);
                user.save().then(function(user){
                    console.log("user address ref added");
                    console.log(user);
                })
                
            }).catch(function(err){
                console.log("address ref does not added",err);
            });

            res.send(result);
        })
        .catch(function(err){
            
            res.status(500).send(err);
        
        });
        
        
        
    },
    
}