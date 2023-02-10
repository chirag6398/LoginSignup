var express=require("express");
var app=express();
var passport=require("passport");
var cors=require("cors");
var morgan=require("morgan");
var dotenv=require("dotenv");
dotenv.config({ path: "./.env" });

require("./db/db");

var port=process.env.PORT||5000;

app.use(passport.initialize());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(require("./routes/user.route"));
app.use(require("./routes/address.route"));



app.listen(port,function(err){
    if(err){
        console.log(err);
    }else{
        console.log("server started at port number : "+port);
    }
})

