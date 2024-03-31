const jwt=require("jsonwebtoken");
const User=require('../models/userModel');
const asyncHandler=require("express-async-handler")

const protectRoute=asyncHandler(async(req,res,next)=>{
        const token=req.cookies.token;
        if(!token){
                return res.status(400).json({error:"token not found"});
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
                return res.status(400).json({error:"token verification failed"});
        }
        const user=await User.findById(decoded.userId).select('-password');

        if(!user){
                return res.status(400).json({error:"user not found"});
        }
        req.user=user;
        next();
})

module.exports=protectRoute;