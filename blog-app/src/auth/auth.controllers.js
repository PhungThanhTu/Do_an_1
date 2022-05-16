const bcrypt  = require('bcrypt');
const {SALT_ROUND} = require('../variables/auth');
const userModel = require('../users/users.model');




exports.register = async(req,res) => {
    var salt = await bcrypt.genSalt(10);
    const username = req.body.username;
    const fullname = req.body.fullname


    const user = await userModel.getUser(username);


    if(user)    // check user exists
    {
        res.status(409).send({
            message:"Username unavailable"
        });
    }
    else{
        // encrypt user password
        console.log(`currently hasing ${req.body.password}`);
        console.log(salt);
        const hashPassword = bcrypt.hashSync(req.body.password,salt);
        const newUser = {
            username:username,
            password:hashPassword,
            fullname:fullname  
        }
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
    };
}

exports.login = async(req,res)=> {
    const username = req.body.username.toLowerCase() || 'pttu2001';
	//const password = req.body.password || 'abc1234';
    const user = await userModel.getUser(username);
    if(!user) return res.status(401).send({message:"Username not exists."});
    return res.status(200).send(user);


}