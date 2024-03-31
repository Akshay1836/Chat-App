const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie =require('../utils/generateTokenAndSetCookie.js')


//signup controller

const signupController = asyncHandler(async (req, res) => {
  const { fullName, username, password, confirmPassword, gender } = req.body;
  if (password !== confirmPassword) {
    return res.status(404).json({ error: "password not matching" });
  }
  const user = await User.findOne({ username });
  if (user) {
    return res.status(404).json({ error: "username already existing" });
  }
  const hashedPassword = await bcrypt.hashSync(password, 10);

  // https://avatar-placeholder.iran.liara.run/

  const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

  const newuser = new User({
    fullName,
    username,
    password: hashedPassword,
    gender,
    profilePic: gender == "male" ? boyProfilePic : girlProfilePic,
  });

  if (newuser) {
    await newuser.save();
    generateTokenAndSetCookie(newuser._id,res);
    res.status(201).json({
      _id: newuser._id,
      fullName: newuser.fullName,
      username: newuser.username,
      profilePic: newuser.profilePic,
    });
  } else {
    res.status(400).json({ error: "Invalid user data" });
  }
});

//login controller

const loginController = asyncHandler(async (req, res) => {
  const {username,password}=req.body;
  if(username && password){
        const user=await User.findOne({username});
        if(!user){
                return res.status(400).json({error:"User not found ,please Login"})   
        }
        if(bcrypt.compareSync(password,user.password)){
                generateTokenAndSetCookie(user._id,res);
                return res.status(400).json({msg:"Login successful",success:true,data:user}) 
        }else{
                return res.status(400).json({error:"password error"}) 
        }
  }else{
        return res.status(400).json({error:"Enter the credentials"})
  }
});


//logout controller

const logoutController = asyncHandler(async (req, res) => {
  res.cookie("jwt","",{maxAge:0});
  res.status(200).json({msg:"Logged Out Successfully"})
});

module.exports = { signupController, loginController, logoutController };
