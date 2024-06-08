var mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const tourSchema = new Schema({
    tourGuide: String,
    destination: String,
    description: String, 
    price: String,
    capacity: String, 

});

const Tour = mongoose.model("Tour", tourSchema)

exports.getTours=async ()=>{
    try {
        const all = await Tour.find({});
        console.log("Finding all tours");
        return all;
    } catch (error) {
        throw new Error("Error getting tours: " +error.message);
    }
}

