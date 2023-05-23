const mongoose = require('mongoose');

// connecting to database 

const connectDB = () =>{
     mongoose.connect('mongodb://127.0.0.1:27017/Assignment', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to database'))
.catch((err) => console.error(err));
}

module.exports = connectDB;