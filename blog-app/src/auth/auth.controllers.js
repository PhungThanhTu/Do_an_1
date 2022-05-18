const bcrypt  = require('bcrypt');
const randToken = require('rand-token');
const userModel = require('../users/users.model');
const methods = require('./auth.methods');




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
    if(!req.body.username) return res.status(400).send({message:"Invalid API Calls"})
    const username = req.body.username.toLowerCase();// || 'pttu2001';
	const password = req.body.password; //|| 'abc1234';
    const user = await userModel.getUser(username);
    if(!user) return res.status(401).send({message:"Username not exists."});

    const isPasswordValid = bcrypt.compareSync(password,user.password);
    if(!isPasswordValid) return res.status(401).send({message:"Invalid password."})

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;

    // access token need an object and a secret key to be generated
    const dataForAccessToken = {
        username: user.username,
    };

    // generate access token using payload and refresh token secret
    const accessToken = await methods.generateToken(dataForAccessToken,accessTokenSecret,accessTokenLife);

    if(!accessToken){
        return res.status(401).send({
            message:" Login failure due to an error"
        });
    }
    // generate refresh token
    let refreshToken = randToken.generate(100);
    user.refreshtoken = refreshToken;
    // generate new token if user have no token before
    userModel.updateToken(user.username,refreshToken);
   
    return res.status(200).send({
        message:"login success",
        token:accessToken,
        rtoken:refreshToken,
        user:user
    }
       
    )


}