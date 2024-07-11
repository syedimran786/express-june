const mongoose = require('mongoose');

function connectDb() {
    return mongoose.connect("mongodb://localhost:27017/company")

}

module.exports = connectDb