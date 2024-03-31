const express=require("express")
const router=express.Router();
const {messageController,getMessage}=require('../controllers/messageController')
const protectRoute=require('../middleware/protectRoute')

router.get('/:id',protectRoute,getMessage)
router.post('/send/:id',protectRoute,messageController)


module.exports=router;