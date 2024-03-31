const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const getusers=asyncHandler(async(req,res)=>{
        const loggedInUser=req.user._id;
        const users=await User.find({_id:{$ne:loggedInUser}}).select("-password -gender")
        if(!users){
                return res.status(400).json({message:"users not found"})
        }
        return res.status(200).json(users)
})

module.exports={getusers}