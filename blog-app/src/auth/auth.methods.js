const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;
// promisity two callbacks from jwt, as I hate using callbacks
const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);


exports.generateToken =  async (payload,secretSignature,tokenLife) => {
    try {
            return await sign( {
                payload
            },
            secretSignature,
            {
                algorithm: 'HS256',
				expiresIn: tokenLife,
            });
    }
    catch(err) {
        console.log(`erro generating token from ${payload} with errorr ${err}`);
        return null;
    }
}