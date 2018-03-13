/* global beforeEach describe it expect GetCitiesFromStorage RemoveCitiesFromStorage */

describe("Weather App - Storage Management", function() {
    beforeEach(function() {
        RemoveCitiesFromStorage();
    });

    it("Initial storage is correct", function() {
        var expectedCities = [2643743, 4219762, 5128638, 6167865, 2950158, 292223];
        var returnedCities = GetCitiesFromStorage();

        for (var i = 0; i < expectedCities.length; i++) {
            expect(expectedCities[i] === returnedCities[i]).toBe(true);
        }
    });

    
    it("Initial storage is not correct", function() {
        var expectedCities = [1, 4219762, 5128638, 6167865, 2950158, 292223];
        var returnedCities = GetCitiesFromStorage();

        var result = true;

        for (var i = 0; i < expectedCities.length; i++) {
            if (expectedCities[i] !== returnedCities[i]) {
                result = false;
            }
        }

        expect(result).toBe(false);
    });
});