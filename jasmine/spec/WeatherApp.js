/* global describe it expect ReturnCitiesFromStorage*/

describe("Weather App", function() {
    it("Cities Storage Management", function() {
        expect(true).toBe(true);
    });

    it("Initial storage is correct", function() {
        var expectedCities = "London;Rome;New York;Toronto;Berlin;Dubai";

        var returnedCities = ReturnCitiesFromStorage();

        expect(expectedCities === returnedCities);
    });

    
    it("Initial storage is not correct", function() {
        var expectedCities = "London;Rome;New York;Toronto;Berlin;Dubaixyz";

        var returnedCities = ReturnCitiesFromStorage();

        expect(expectedCities === returnedCities).toBe(false);
    });
});