const bcrypt  = require('bcrypt');
const {SALT_ROUND} = require('../variables/auth')




exports.register = async(req,res) => {
    var salt = bcrypt.genSalt(10);
    const username = req.body.user.username;
    const fullname = req.body.user.fullname
    const user = await userModel.getUser(username);


    if(user)    // check user exists
    {
        res.status(409).send({
            message:"Username unavailable"
        });
    }
    else{
        // encrypt user password
        const hashPassword = bcrypt.hashSync(req.body.user.password,SALT_ROUND);
        const newUser = {
            username:username,
            password:hashPassword,
            fullname:fullname
            
        }
    };
    const createUser = await userModel.createUser(newUser);
    if(!createUser){
        return res
        .status(400)
        .send({
            message:"Error occured during account creation, please try again"
        });  
    }
    return res.send({
        user:newUser
    });
}