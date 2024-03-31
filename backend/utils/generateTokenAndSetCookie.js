const jwt=require("jsonwebtoken");

const generateTokenAndSetCookie=async(userId,res)=>{
        
        const token=jwt.sign({userId},process.env.JWT_SECRET,{
                expiresIn:"15d",
        })

        res.cookie("token",token,{
                maxAge:15*24*60*60*1000, //ms
                httpOnly:true,//prevent xss attacks
                sameSite:"strict",//CSRF Attacks
                secure:process.env.NODE_ENV!=="development",
        });
}

module.exports=generateTokenAndSetCookie;