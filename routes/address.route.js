var addressRoute=require("express").Router();
var addressController=require("../controller/address.controller.js");



addressRoute.post("/address",addressController.saveAddress);

module.exports=addressRoute;