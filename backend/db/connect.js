const mongoose=require('mongoose');

const connectDB=async()=>{
        try {
                await mongoose.connect(process.env.CONNECTION_STRING).then(console.log("DB connected"))
        } catch (error) {
                console.log("error connecting to mongodb" + error)
        }
}

module.exports=connectDB;