const User = require('../models/users');

exports.createuser = async(req,res,next)=>{
    try {
        const {username,password}= req.body;
        User.create({username,password});
        res(200).json({
            message:"succesful creation of user",
        })
    } catch (error) {
        
    }
}