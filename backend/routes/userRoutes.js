const express=require("express");
const protectRoute = require("../middleware/protectRoute");
const router=express.Router();
const {getusers}=require('../controllers/userController')


router.get('/',protectRoute,getusers)


module.exports=router;