
require('dotenv').config();


const mongoose = require('mongoose');

mongoose.set('debug', true); 

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {console.log("Connected to Mongo DB")})
    .catch((e) => console.log(e));

// mongoose.connect(process.env.MONGO_URI)
