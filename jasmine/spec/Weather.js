/* global beforeEach describe it expect GetCitiesFromStorage RemoveCitiesFromStorage GetWeatherIcon GetTemperatureRange SaveCitiesToStorage */

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

describe("Weather App - Icons", function() {
    it("Sunny icon is correct", function() {
        var icon = GetWeatherIcon("Clear");

        expect(icon === "images/icons/sunny.svg").toBe(true);
    });

    it("Drizzle: icon is correct", function() {
        var icon = GetWeatherIcon("Drizzle");

        expect(icon === "images/icons/shower.svg").toBe(true);
    });

    it("Rain icon is correct", function() {
        var icon = GetWeatherIcon("Rain");

        expect(icon === "images/icons/rain.svg").toBe(true);
    });

    it("Haze icon is correct", function() {
        var icon = GetWeatherIcon("Haze");

        expect(icon === "images/icons/cloudysunny.svg").toBe(true);
    });

    it("Clouds icon is correct", function() {
        var icon = GetWeatherIcon("Clouds");

        expect(icon === "images/icons/cloudy.svg").toBe(true);
    });

    it("Mist icon is correct", function() {
        var icon = GetWeatherIcon("Mist");

        expect(icon === "images/icons/wind.svg").toBe(true);
    });

    it("Fog icon is correct", function() {
        var icon = GetWeatherIcon("Fog");

        expect(icon === "images/icons/dust.svg").toBe(true);
    });

    it("Dust icon is correct", function() {
        var icon = GetWeatherIcon("Dust");

        expect(icon === "images/icons/dust.svg").toBe(true);
    });

    it("Snow icon is correct", function() {
        var icon = GetWeatherIcon("Snow");

        expect(icon === "images/icons/snow.svg").toBe(true);
    });
});

describe("Weather App - Temperature", function() {
    it("Temperature(cold) is correct", function() {
        var icon = GetTemperatureRange(4);

        expect(icon === "cold").toBe(true);
    });

    it("Temperature(medium) is correct", function() {
        var icon = GetTemperatureRange(10);

        expect(icon === "medium").toBe(true);
    });

    it("Temperature(hot) is correct", function() {
        var icon = GetTemperatureRange(16);

        expect(icon === "hot").toBe(true);
    });
});

describe("Weather App - AJAX", function() {
    it("Temperature(cold) is correct", function() {
        RemoveCitiesFromStorage();

        SaveCitiesToStorage = jasmine.createSpy("SaveCitiesToStorage");

        GetCitiesFromStorage();

        expect(SaveCitiesToStorage).toHaveBeenCalled();
    });
});