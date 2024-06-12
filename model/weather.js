var mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const weatherSchema = new Schema({
    temp: BigInt,
    floodRisk: Number , 
    droughtRisk: Number,
    date: Date,
});

const Weather = mongoose.model("Weather", weatherSchema)

exports.getWeatherData=async ()=>{
    try {
        const all = await Weather.find({});
        return all;
    } catch (error) {
        throw new Error("Error getting weather: " +error.message);
    }
}