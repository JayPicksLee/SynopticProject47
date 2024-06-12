const Items = require('../model/marketitem.js');
const mongoose = require('mongoose');

describe('getItems', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return all market items data', async () => {
        const mockData = [
            {name: "item name1", price: "20", type: "type 1", availabilty: "100"},
            {name: "item name2", price: "25", type: "type 2", availabilty: "120"}
        ];

        jest.spyOn(mongoose.Model, 'find').mockResolvedValue(mockData);

        const result = await Items.getItems();
        expect(result).toEqual(mockData);
    });

    it('should throw an error if getting data fails', async () => {

        const errorMessage = 'Database error';
        jest.spyOn(mongoose.Model, 'find').mockRejectedValue(new Error(errorMessage));

        // Call the function and expect it to throw an error
        await expect(Items.getItems).rejects.toThrow(
            'Error getting items: ' + errorMessage
        );
    });
});
