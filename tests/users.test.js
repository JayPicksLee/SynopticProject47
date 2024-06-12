const User = require('../model/users.js');
const mongoose = require('mongoose');

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

        // Call the function and expect it to throw an error
        await expect(User.getUsers).rejects.toThrow(
            'Error getting users: ' + errorMessage
        );
    });
});
