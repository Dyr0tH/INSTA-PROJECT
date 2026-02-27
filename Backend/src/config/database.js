const mongoose = require('mongoose')

async function connectToDB(){
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongo db")
}

module.exports = connectToDB;