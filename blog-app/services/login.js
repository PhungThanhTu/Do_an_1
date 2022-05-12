const jwt = require('jsonwebtoken')
require('dotenv').config()
const global = require('./global')

const users = [
    {
        name:"Phuta",
        pass:"ack",
        "role":"admin"
    },
    {
        name:"Misfa",
        pass:"ack",
        role:"writer"
    },
    {
        name:"Riva",
        pass:"ack",
        role:"user"
    }
]




module.exports = {
    get:async (req,res) => {
        const username = req.body.name;
        // authentication
        const user = {
            name: username
        };

        const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
        res.json({accessToken: accessToken});

    },
    test:async (req,res) => {
        res.json(users.filter(user=>user.name === req.user.name));
    },
    post:async (req,res) => {

    }

}