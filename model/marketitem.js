var mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const marketItemSchema = new Schema({
    price: String,
    name: String,
    type: String,
    availability: String,
});

const Items = mongoose.model("Items", marketItemSchema)

exports.getItems=async ()=>{
    try {
        const all = await Items.find({});
        console.log("Finding market items");
        return all;
    } catch (error) {
        throw new Error("Error getting items: " +error.message);
    }
}


exports.createItem = async (price, name, type, availability) => {
    try {
        const price = price;
        const name = name;
        const type = type;
        const availability = availability;


        const newItem = new Item({
            price: price,
            name: name, 
            type: type,
            availability: availability});

              
       const savedItem = await newItem.save();
        
    } catch (error) {
        throw new Error('Error saving request data: ' + error.message);
    }
}
