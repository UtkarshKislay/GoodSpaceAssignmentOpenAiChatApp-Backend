const express=require('express');
const router=express.Router();

const UserConroller=require('../controller/User');
const EmailVerification=require('../controller/EmailVerfication');

router.post('/user/login',UserConroller.Login);
router.post('/user/register',UserConroller.Register);
router.post('/user/registration/generate-otp',EmailVerification.VerifyEmail)
router.post('/user/registration/verify-otp',EmailVerification.verfiyOTP);

module.exports=router;