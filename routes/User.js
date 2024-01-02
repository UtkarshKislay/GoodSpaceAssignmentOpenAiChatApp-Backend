
const express=require('express');
const router=express.Router();

const UserConroller=require('../controller/User');
// console.log(UserConroller)

router.post('/user/login',UserConroller.Login);
router.post('/user/register',UserConroller.Register);
router.post('/user/registration/generate-otp',UserConroller.VerifyEmail)


module.exports=router;