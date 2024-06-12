const Tour = require('../model/tour.js');
const mongoose = require('mongoose');

describe('getTours', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return all tour data', async () => {
        const mockData = [
            {tourGuide: "Tour guide", Destination: "Destination", Description: "Description", Price: "20", Capacity: "30"},
            {tourGuide: "Tour guide2", Destination: "Destination 2", Description: "Description 2", Price:"35", Capacity: "40" }
        ];

        jest.spyOn(mongoose.Model, 'find').mockResolvedValue(mockData);

        const result = await Tour.getTours();
        expect(result).toEqual(mockData);
    });

    it('should throw an error if getting data fails', async () => {

        const errorMessage = 'Database error';
        jest.spyOn(mongoose.Model, 'find').mockRejectedValue(new Error(errorMessage));

        // Call the function and expect it to throw an error
        await expect(Tour.getTours).rejects.toThrow(
            'Error getting tours: ' + errorMessage
        );
    });
});
