const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    Name : { type: String ,required: true },
    Age : { type: Number },
    Email : { type: String ,required: true, unique: true },
    Password : { type: String ,required: true },
    profilePhoto : { type: String}
})

const userModel = mongoose.model("User",userSchema)

module.exports = userModel;