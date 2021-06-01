const basicAuth = require('express-basic-auth');
const User = require('../models/users');

exports.auth = async(req, res, next) => {
    try {
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            var err = new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            next(err);
            return;
        }
      
        const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        const username= auth[0];
        const password = auth[1];
        const founduser = await User.findOne({username:username});
        if (basicAuth.safeCompare(founduser.password, password)) {
            req.user = founduser;
            next(); 
        } else {
            var err = new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate', 'Basic');      
            err.status = 401;
            next(err);
        }    
    } catch (error) {
        console.log(error);
    }
    
}

