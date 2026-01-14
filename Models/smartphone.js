const mongoose = require("mongoose")

const smartphoneSchema = new mongoose.Schema({
    Name : { type : String , required : true },
    Price : { type : Number, required : true },
    Display : { type : String , required : true },
    RAM : { type : Number, required : true }
})

const smartphoneModel = mongoose.model("Smartphone",smartphoneSchema)

module.exports = smartphoneModel;