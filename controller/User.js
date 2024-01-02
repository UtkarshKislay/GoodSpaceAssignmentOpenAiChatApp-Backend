

const userModal = require('../modal/User');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator'); 
class UserController {
    static VerifyEmail=async(req,res)=>{
        const data=req.body;
        const email=data.email;
        console.log(email);
        try{
            const otp = otpGenerator.generate(6, { digits: true,lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false });
            console.log(otp);
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.Email_Username,
                    pass: process.env.Email_Password 
                }
            });
            const mailOptions = {
                from: process.env.Email_Username,
                to: email,
                subject: 'OTP Verification',
                text: `Your OTP for email verification is: ${otp}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                    return res.status(500).json('Error sending OTP via email');
                } else {
                    console.log('Email sent: ' + info.response);
                    return res.status(200).json('OTP sent successfully');
                }
            });
            return res.status(200).json("OtP is verfied");

        }catch(err){
            console.log(err);
            return res.status(403).json("Internal Server Error");
        }
    }

    static verfiyOTP=async(req,res)=>{
        try{
            

        }catch(err){
            console.log(err);
            return res.status(403).json("Error verifying otp");
        }
    }

    static Login = async (req, res) => {
        const data = req.body;
        const userName = data.userName;
        const password = data.password;
        try {
            const userInDatabase = await userModal.findOne({ userName: userName });
            if (userInDatabase != null) {
                if (userInDatabase.password == password) {
                    return res.status(200).json("Login Successfull");
                }
                return res.status(200).json("Password not matched");
            }
            return res.status(200).json("UserName not exist");
        } catch (err) {
            console.log("errr in login ", err);
            return res.status(403).json("Internal server error");
        }
    }


    static Register = async (req, res) => {
        try {
            const data = await req.body;
            const email = data.email;
            const userName = data.userName;
            const password = data.password;
            const userWithEmail = await userModal.findOne({ email: email });
            if (userWithEmail != null) {
                return res.status(200).json("Email Already Exist");
            }
            const userWithUserName = await userModal.findOne({ userName: userName });
            if (userWithUserName != null) {
                return res.status(200).json("Username Already Exist");
            }
            const newUser = userModal({
                userName: userName,
                email: email,
                password: password
            });
            newUser.save();
            console.log(data);
            return res.status(200).json("New user save Successfully");

        } catch (err) {
            console.log(err);
            return res.status(403).json("Internal server error");
        }
    }
}

module.exports = UserController;






