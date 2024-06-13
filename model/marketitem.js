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
//function to allow pug to render information from the database
exports.getItems=async ()=>{
    try {
        const all = await Items.find({});
        return all;
    } catch (error) {
        throw new Error("Error getting items: " +error.message);
    }
}

//this function create scheme for the database that will be use for market page
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
//this function allow deletion of items through the pug page
exports.deleteItem = async (itemId)=>{
    try {
        console.log(itemId);
        await Items.findByIdAndDelete(itemId);

    } catch (error) {
        console.log("ERROR DELETEING ITEM");
    }
}
