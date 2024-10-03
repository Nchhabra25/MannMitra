const User=require("../models/user-models");
const bcrypt=require("bcryptjs")

//defining the controller for homepage
const home= async(req,res)=>{
    try {
        res.send("welcome to homepage using controller");
    } catch (error) {
        console.log(error);
    }
}

//defining the controller for registration page
const register= async(req,res)=>{
    try {
        //destructure the contents of ur request
        const {username,email,phone,password,mentalHealthStatus,age}=req.body

        //checking for duplicate email 
        const userexsist=await User.findOne({email: email});

        if(userexsist){
            return res.json("user already exsists")
        }

        //hash password and store in db
        const saltRound=10;
        const hashPass=await bcrypt.hash(password,saltRound);

        const created_user= await User.create({
            email,
            username,
            phone,
            password:hashPass,
            mentalHealthStatus,
            age});

        res.status(200).json({
            msg:created_user,
            token:await created_user.generateToken(),  //jwt
            userId:created_user._id.toString(),        //jwt
        });
        } 
        
        catch (error) {
        console.log(error);
    }
}

//defining the logic for login page
const login=async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        //checking if user exsists
        const userExsist1=await User.findOne({email});
        const userExsist2=await User.findOne({username})

        if(!userExsist1 && !userExsist2){
            return res.json({message:"Sorry, this user does not exsist"})
        }

        const authmethod=userExsist1||userExsist2;
        console.log(authmethod)
        const Password=await bcrypt.compare(password,authmethod.password);

        if(Password){
            res.json({
                msg:"registration successful",
                token:await authmethod.generateToken(),  
                userId:authmethod._id.toString(), 
            })
        }
        else{
            res.json({msg:`Invalid Password`})
        }

    } catch (error) {
        console.log(error)
    }
}


module.exports={home,register,login}