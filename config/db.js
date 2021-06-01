const mongoose = require('mongoose');

connectDB = async () => { 
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology: true,
            useCreateIndex:true,
            useFindAndModify:false,
        });
        console.log('mongoDB connected');
    } catch (error) {
        
    }
};

module.exports = connectDB;