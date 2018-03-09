/* global beforeEach describe it expect GetCitiesFromStorage RemoveCitiesFromStorage */

describe("Weather App - Storage Management", function() {
    beforeEach(function() {
        RemoveCitiesFromStorage();
    });

    it("Initial storage is correct", function() {
        var expectedCities = "2643743,4219762,5128638,6167865,3614789,292223";
        var returnedCities = GetCitiesFromStorage();

        expect(expectedCities === returnedCities).toBe(true);
    });

    
    it("Initial storage is not correct", function() {
        var expectedCities = "2643743,4219762,5128638,6167865,3614789,292223abc";
        var returnedCities = GetCitiesFromStorage();

        expect(expectedCities === returnedCities).toBe(false);
    });
});