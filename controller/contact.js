const User = require('../models/users');

exports.addtoContacts = async(req,res,next) =>{
    try {
        const {name,email,phonenumber,address}= req.body;
        const foundUser= await User.findById(req.user._id);
        if(!foundUser){
            res.status(404).json({
                message:"user with username not found",
            })
            next();
        }
        foundUser.contactbook.push({name,email,phonenumber,address});
        await foundUser.save();
        res.status(200).json({
            success:true,
            message:"contact added",
        });
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"server error",
        })
        next();
    }
};

exports.updateContact = async (req,res,next)=>{
    try {
        //console.log(req.body);
        const {contactid,email,name,phonenumber,address} = req.body;
        await User.findOneAndUpdate(
                {
                    "_id":req.user._id,
                    "contactbook._id":contactid,
                },
                {
                    "$set": {
                        "contactbook.$.email" :email ,
                        "contactbook.$.name" : name,
                        "contactbook.$.phonenumber": phonenumber,
                        "contactbook.$.address":address,
                    }
                },
                function(err,doc){
                    console.log(doc);
                }
            );
            res.status(200).json({
                success:true,
                message:"contact updated",
            });
        next();
    } catch (error) {
        res.status(500).json({
            message:"server error",
        })
    }
}

exports.deleteContact = async(req,res,next)=>{
    try {
        const {contactid}= req.body;
        const foundUser=await User.findById(req.user._id);
        foundUser.contactbook.pull({_id:contactid});
        await foundUser.save();
        res.status(200).json({
            success:true,
            message:"contact deleted",
        });
    } catch (error) {
        res.status(500).json({
            message:"server error",
        })
    }
}

exports.searchContact= async(req,res,next)=>{
    try {
        const {name}=req.body;
        var contactsfund = new Array();
        const foundUser= await User.findById(req.user._id);
        for(var i=0;i<foundUser.contactbook.length;i++){
            if(contactsfund.length==10){
                break;
            }
            if(foundUser.contactbook[i].name.includes(name)){
                contactsfund.push(foundUser.contactbook[i]);
            }
        }
        res.status(200).json({
            success:true,
            contacts:contactsfund,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"server error",
        })
    }
}

exports.searchContactbyemail= async(req,res,next)=>{
    try {
        const {email}=req.body;
        var contactsfund = new Array();
        const foundUser= await User.findById(req.user._id);
        for(var i=0;i<foundUser.contactbook.length;i++){
            if(contactsfund.length==10){
                break;
            }
            if(foundUser.contactbook[i].email.includes(email)){
                contactsfund.push(foundUser.contactbook[i]);
            }
        }
        res.status(200).json({
            success:true,
            contacts:contactsfund,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"server error",
        })
    }
}

exports.allContacts= async(req,res,next)=>{
    try {
        const foundUser= await User.findById(req.user._id);
        res.status(200).json({
            success:true,
            contacts:foundUser.contactbook,
        })
    } catch (error) {
        res.status(500).json({
            message:"server error",
        })
    }
}