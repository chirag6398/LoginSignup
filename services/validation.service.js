module.exports={
    validateSignUpData:function(req,res){
        var username=req.body.username;
        var lname=req.body.lname;
        var fname=req.body.fname;
        var password=req.body.password;
        var cpassword=req.body.cpassword;
        var number=req.body.number;
        var email=req.body.email;

        

        username=username.trim();
        lname=lname.trim();
        fname=fname.trim();
        password=password.trim();
        cpassword=cpassword.trim();
        // number=number.trim();
        email=email.trim();
        

        if(!username || !lname || !fname || !password || !number || !cpassword){
           return res.status(404).send({message:"please fill all fields"});
            
        }

        if(username.length<4){
           return res.status(403).send({message:"length of username must be greater then 3"});
        }

        var rgExEmail=/^([a-z A-Z 0-9 \. -]+)@([0-9 a-z A-Z -]+).([a-z]{2,8})(.[a-z]{2,4})?$/;

        if(!rgExEmail.test(email)){
           return res.status(403).send({message:"please enter valid email"});
        }
        var regExLowerCase=/[a-z]/;
        var regExUpperCase=/[A-Z]/;
        var regExNumbericCharacter=/[0-9]/;

        if(!regExLowerCase.test(password) || !regExNumbericCharacter.test(password) || !regExUpperCase.test(password) || password.length<5 || password.length>8){
           return res.status(403).send({message:"password does not fill criteria"})
        }

        if(password!==cpassword){
           return res.status(403).send({message:"confirm password does not match password"});
        }

        var rgExNumber=/^[6-9]{1}[0-9]{9}$/;

        if(!rgExNumber.test(number)){
           return res.status(403).send({message:"number is wrong"});
        }

        return true;


        

    }
}