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
    const all = await User.find({});

    return all;
}

exports.getUserById= async (Id)=>{
    const user = await User.findById({_id: Id})

    return user;
}

exports.getUserID=async (email)=>{
    const id = await User.findOne({email: email})

    return id.id;
}

exports.getUserStatus=async (email)=>{
    const level = await User.findOne({email: email})

    return level.accountLevel;
}

exports.checkExists = async (email)=>{
    try {

        let user = await User.findOne({email: email})
        let check = false;

        if(user !== null){
            check = true;
            return check
        }else{
            return check;
        }
        } catch (error) {
            throw new Error("Error finding username: " +error.message);
    }
};

exports.checkLoginDetails = async (email, password)=>{

    try {
        
        let user = await User.findOne({email: email})

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return false;
        }        

        return user;
    } catch (error) {
        throw new Error("Error checking login details: " +error.message);
    }
};


exports.signUpUser = async (firstName, lastName, password, email, phoneNumber) => 
    {
    try 
    {
        const isAdmin = false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{11}$/;

        const userExists = await User.findOne({email: email})

        let check = false;

        const passwordHashed = await bcrypt.hash(password, 8);

        if(userExists !== null){
            check = true
        }else{
            check = false;
        }
        console.log(check);

        if (check) 
        {
            console.log('Email already exists');
            return;
        }
        
            const newUser = new User({accountLevel: isAdmin, firstName: firstName, lastName: lastName, password: passwordHashed, email: email, phoneNumber: phoneNumber});
            const savedUser = await newUser.save();
    } 
    catch (error) 
    {
        console.log('Error saving user data: ' + error.message);
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

exports.deleteUserAccount = async (userId) =>
    {
        try
        {
            return await User.deleteOne({ _id: userId });
        }
        catch (error)
        {
            throw error;
        }
    }
