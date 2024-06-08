var mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const marketItemSchema = new Schema({
    name: String,
    price: String,
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


exports.createItem = async (name, price, type, availability) => {
    try {

        const newItem = new Items({
            name: name, 
            price: price,
            type: type,
            availability: availability});
            
       const savedItem = await newItem.save();
        
    } catch (error) {
        throw new Error('Error saving item data: ' + error.message);
    }
}
