const mongoose=require("mongoose");
const jwt=require('jsonwebtoken');

const userschema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phone:{
        type:Number,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    mentalHealthStatus:{ 
        type:String, 
        enum:['Good', 'Fair', 'Poor']
    },
    age:{
        type:Number
    }
});

//configuring json web token
userschema.methods.generateToken=function(){
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
        },
        process.env.JWT_KEY,
        {
            expiresIn:"3d",
        }
    )
    } catch (error) {
        console.log(error)
    }
}

const User=mongoose.model("User",userschema);
module.exports=User;