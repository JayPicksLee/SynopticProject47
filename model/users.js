var mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    accountLevel: Boolean,
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    phoneNumber: String,
});

const User = mongoose.model("User", UserSchema)

exports.getUsers= async ()=>{
    try {
        const all = await User.find({});

        return all;
    } catch (error) {
        throw new Error("Error getting users: " + error.message);
    }

}

exports.getUserById= async (Id)=>{
    try {
        const user = await User.findById({_id: Id})
        return user;
    } catch (error) {
        throw new Error("Error getting user: " + error.message);
    }
}

exports.getUserID=async (email)=>{
    try {
        const id = await User.findOne({email: email})

        return id._id;
    } catch (error) {
        throw new Error("Error getting user ID: " + error.message);
    }

}

exports.getUserStatus=async (email)=>{
    try {
        const level = await User.findOne({email: email})

        return level.accountLevel;
    } catch (error) {
        throw new Error("Error getting user status: " + error.message);
    }
}

exports.checkExists = async (email)=>{
    try {
        let user = await User.findOne({email: email})

        if(user !== null){
            return true;
        }else{
            return false;
        }
    } catch (error) {
            throw new Error("Error finding username: " +error.message);
    }

};

exports.checkLoginDetails = async (email, password)=>{

    try {
        let user = await User.findOne({email: email})

        if (!user) {
            return false;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            return false;
        }

        return user;
    } catch (error) {
        throw new Error("Error checking login details: " +error.message);
    }
};


exports.signUpUser = async (firstName, lastName, password, email, phoneNumber) => 
    {
        console.log("Beginning signup of user....")
        const isAdmin = false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{11}$/;

        const passwordHashed = await bcrypt.hash(password, 8);
        console.log("Checking if user already exists...");

        if(email.indexOf(" ") > -1 ){
            throw new Error("Email cannot have white space.");

        }
        if(await this.checkExists(email) == true){
            throw new Error("Email already exists");
        }else{
            console.log("Checking password for white space...")
            if(password.indexOf(" ") > -1 ){
                throw new Error("Password cannot have white space.");
            }else{
                const newUser = new User({accountLevel: isAdmin, firstName: firstName, lastName: lastName, password: passwordHashed, email: email, phoneNumber: phoneNumber});
                const savedUser = await newUser.save();

            }  
        }
}

exports.displayUserAccounts = async () => 
    {
        try 
        {
            return await User.find({ accountLevel: false }, { _id: 1, username: 1, email: 1, phoneNumber: 1 });
        } 
        catch (error)
        {
            throw error;
        }
    }

    exports.deleteUserAccount = async (userId) => {
        try {
            console.log(userId);
            await User.findByIdAndDelete(userId);
    
        } catch (error) {
            console.log("ERROR DELETEING USER");
        }
    }
    