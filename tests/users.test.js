const User = require('../model/users.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

jest.mock('bcrypt');

describe('getUsers', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return all user data', async () => {
        const mockData = [
            { accountLevel: false, firstName: "Jus", lastName: "Pic", password: "password", email: "email@gmail.com", phoneNumber: "Number" },
            { accountLevel: false, firstName: "Book", lastName: "Wi", password: "password2", email: "email2@gmail.com", phoneNumber: "Number2" }
        ];

        jest.spyOn(mongoose.Model, 'find').mockResolvedValue(mockData);

        const result = await User.getUsers();
        expect(result).toEqual(mockData);
    });

    it('should throw an error if getting data fails', async () => {

        const errorMessage = 'Database error';
        jest.spyOn(mongoose.Model, 'find').mockRejectedValue(new Error(errorMessage));

        await expect(User.getUsers).rejects.toThrow(
            'Error getting users: ' + errorMessage
        );
    });
});

describe('getUserId', ()=>{
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return user data from id', async () =>{
        const mockData ={_id: '123' ,accountLevel: false, firstName: "Jus", lastName: "Pic", password: "password", email: "email@gmail.com", phoneNumber: "Number" };

        jest.spyOn(mongoose.Model, 'findById').mockResolvedValue(mockData);

        const result = await User.getUserById('123');
        
        expect(result).toEqual(mockData);
    })

    it('should throw an error if getting data fails', async () => {

        const errorMessage = 'Database error';
        jest.spyOn(mongoose.Model, 'findById').mockRejectedValue(new Error(errorMessage));

        await expect(User.getUserById('123')).rejects.toThrow(
            'Error getting user: ' + errorMessage
        );
    });
})

describe('getUserID', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return the user ID for the given email', async () => {
        const mockUserData = { _id: '123', email: 'test@gmail.com'};

        jest.spyOn(mongoose.Model, 'findOne').mockResolvedValue(mockUserData);

        const result = await User.getUserID('test@gmail.com');
        expect(result).toEqual('123');
    });

    it('should throw an error if User.findOne fails', async () => {

        const errorMessage = 'Database error';
        jest.spyOn(mongoose.Model, 'findOne').mockRejectedValue(new Error(errorMessage));

        await expect(User.getUserID('test@gmail.com')).rejects.toThrow('Error getting user ID: ' + errorMessage);
    });
});

describe('getUserStatus', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return the user status for the given email', async () => {
        const mockUserData = {accountLevel: false, email: 'test@gmail.com'};

        jest.spyOn(mongoose.Model, 'findOne').mockResolvedValue(mockUserData);

        const result = await User.getUserStatus('test@gmail.com');
        expect(result).toEqual(false);
    });

    it('should throw an error if User.findOne fails', async () => {

        const errorMessage = 'Database error';
        jest.spyOn(mongoose.Model, 'findOne').mockRejectedValue(new Error(errorMessage));

        await expect(User.getUserStatus('test@gmail.com')).rejects.toThrow('Error getting user status: ' + errorMessage);
    });
});

describe('checkExists', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a boolean value of true for the given email to confirm if it already exists', async () => {
        const mockUserData = {accountLevel: false, firstName: "Jus", lastName: "Pic", password: "password", email: "email@gmail.com", phoneNumber: "Number"};

        jest.spyOn(mongoose.Model, 'findOne').mockResolvedValue(mockUserData);

        const result = await User.checkExists('email@gmail.com');
        expect(result).toEqual(true);
    });

    it('should return a boolean value of false for the given email to confirm if it doesnt already exist', async () => {
        const mockUserData = {};

        jest.spyOn(mongoose.Model, 'findOne').mockResolvedValue(mockUserData);

        const result = await User.checkExists('email@gmail.com');
        expect(result).toEqual(true);
    });

    it('should throw an error if User.findOne fails', async () => {

        const errorMessage = 'Database error';
        jest.spyOn(mongoose.Model, 'findOne').mockRejectedValue(new Error(errorMessage));

        await expect(User.checkExists('email@gmail.com')).rejects.toThrow('Error finding username: ' + errorMessage);
    });
});

describe('checkLoginDetails', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return the user if email and password are correct', async () => {
        const mockUserData = { _id: '123', email: 'email@gmail.com', password: 'hashedPassword' };
        jest.spyOn(mongoose.Model, 'findOne').mockResolvedValue(mockUserData);
        
        bcrypt.compare.mockResolvedValue(true);

        const result = await User.checkLoginDetails('email@gmail.com', 'correctPassword');
        expect(result).toEqual(mockUserData);
    });

    it('should return false if user is not found', async () => {
        jest.spyOn(mongoose.Model, 'findOne').mockResolvedValue(null);

        const result = await User.checkLoginDetails('email@gmail.com', 'wrongPassword');
        expect(result).toBe(false);
    });

    it('should return false if password is incorrect', async () => {
        const mockUserData = { _id: '123', email: 'email@gmail.com', password: 'hashedPassword' };
        jest.spyOn(mongoose.Model, 'findOne').mockResolvedValue(mockUserData);

        bcrypt.compare.mockResolvedValue(false);

        const result = await User.checkLoginDetails('email@gmail.com', 'wrongPassword');
        expect(result).toBe(false);
    });

    it('should throw an error if User.findOne fails', async () => {
        const errorMessage = 'Database error';
        jest.spyOn(mongoose.Model, 'findOne').mockRejectedValue(new Error(errorMessage));

        await expect(User.checkLoginDetails('email@gmail.com', 'password')).rejects.toThrow('Error checking login details: ' + errorMessage);
    });

    it('should throw an error if bcrypt.compare fails', async () => {
        const mockUserData = { _id: '123', email: 'email@gmail.com', password: 'hashedPassword' };
        jest.spyOn(mongoose.Model, 'findOne').mockResolvedValue(mockUserData);

        const errorMessage = 'Bcrypt error';
        bcrypt.compare.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        await expect(User.checkLoginDetails('email@gmail.com', 'password')).rejects.toThrow('Error checking login details: ' + errorMessage);
    });
});