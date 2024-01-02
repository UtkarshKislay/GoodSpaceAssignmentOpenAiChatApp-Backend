const userModal = require('../modal/User');
class UserController {

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
            await newUser.save();
            console.log(data);
            return res.status(200).json("New user save Successfully");

        } catch (err) {
            console.log(err);
            return res.status(403).json("Internal server error");
        }
    }
}

module.exports = UserController;






