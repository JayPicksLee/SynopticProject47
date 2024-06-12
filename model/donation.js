var mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const donationSchema = new Schema({
    forname: String,
    surname: String,
    email: String,
    mobile: String,
    price: String,
    
});

const Donation = mongoose.model("Donation", donationSchema)

exports.getDonations=async ()=>{
    try {
        const all = await Donation.find({});
        console.log("Finding donations");
        return all;
    } catch (error) {
        throw new Error("Error getting donations: " +error.message);
    }
}

exports.createDonation = async (forename, surname, email, mobile, price) => {
    try {

        const newDonation = new Donation({
            forename: forename,
            surname: surname, 
            email: email,
            mobile: mobile,
            price: price
             });

              
       const savedDonation = await newDonation.save();
        
    } catch (error) {
        throw new Error('Error saving request data: ' + error.message);
    }
}

exports.deleteDonation = async (donationId)=>{
    try {
        console.log(donationId);
        await Donation.findByIdAndDelete(donationId);

    } catch (error) {
        console.log("ERROR DELETEING DONATION");
    }
}