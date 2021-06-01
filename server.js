require("dotenv").config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

connectDB();

const app = express();

app.use(express.json());
app.use('/private',authRoutes);
app.use('/profile',profileRoutes);


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on("unhandledRejection",(err)=>{
    console.log(`error:${err}`);
    server.close(()=> process.exit(1));
})
  