const Weather = require('../model/weather.js');
const mongoose = require('mongoose');

describe('getWeatherData', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return all weather data', async () => {
        const mockData = [
            { temp: 20, floodRisk: 0.2, droughtRisk: 0.1, date: new Date("2024-06-12") },
            { temp: 25, floodRisk: 0.3, droughtRisk: 0.2, date: new Date("2024-06-13") }
        ];

        jest.spyOn(mongoose.Model, 'find').mockResolvedValue(mockData);

        const result = await Weather.getWeatherData();
        expect(result).toEqual(mockData);
    });

    it('should throw an error if getting data fails', async () => {

        const errorMessage = 'Database error';
        jest.spyOn(mongoose.Model, 'find').mockRejectedValue(new Error(errorMessage));

        // Call the function and expect it to throw an error
        await expect(Weather.getWeatherData()).rejects.toThrow(
            'Error getting weather: ' + errorMessage
        );
    });
});
