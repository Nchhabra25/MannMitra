const mongoose=require("mongoose");

const URI="mongodb://127.0.0.1:27017/minorproject";

const connectdb=async ()=>{
    try {
        await mongoose.connect(URI)
        
    } catch (error) {
        console.log(error)
        process.exit(0)
    }
}

module.exports=connectdb;