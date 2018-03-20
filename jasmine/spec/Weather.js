/* eslint-disable no-unused-vars */
/* global jasmine describe beforeEach it expect weather */

var SaveCitiesToStorage;

describe("Weather App - Storage Management", function() {
    beforeEach(function() {
        weather.RemoveCitiesFromStorage();
    });

    it("Initial storage is correct", function() {
        var expectedCities = [2643743, 4219762, 5128638, 6167865, 2950158, 292223];
        var returnedCities = weather.GetCitiesFromStorage();

        for (var i = 0; i < expectedCities.length; i++) {
            expect(expectedCities[i] === returnedCities[i]).toBe(true);
        }
    });
 
    it("Initial storage is not correct", function() {
        var expectedCities = [1, 4219762, 5128638, 6167865, 2950158, 292223];
        var returnedCities = weather.GetCitiesFromStorage();

        var result = true;

        for (var i = 0; i < expectedCities.length; i++) {
            if (expectedCities[i] !== returnedCities[i]) {
                result = false;
            }
        }

        expect(result).toBe(false);
    });

    it("Save cities to storage called (createSpy)", function() {
        weather.RemoveCitiesFromStorage();

        weather.SaveCitiesToStorage = jasmine.createSpy("weather.SaveCitiesToStorage");

        weather.GetCitiesFromStorage();

        expect(weather.SaveCitiesToStorage).toHaveBeenCalled();
    });

    it("Save cities to storage called (createSpy return new function)", function() {
        weather.RemoveCitiesFromStorage();

        weather.SaveCitiesToStorage = jasmine.createSpy("weather.SaveCitiesToStorage").and.callFake(function() {
            return;
        });

        weather.GetCitiesFromStorage();

        expect(weather.SaveCitiesToStorage).toHaveBeenCalled();
    });
});

describe("Weather App - Icons", function() {
    it("Sunny icon is correct", function() {
        var icon = weather.GetWeatherIcon("Clear");

        expect(icon === "images/icons/sunny.svg").toBe(true);
    });

    it("Drizzle: icon is correct", function() {
        var icon = weather.GetWeatherIcon("Drizzle");

        expect(icon === "images/icons/shower.svg").toBe(true);
    });

    it("Rain icon is correct", function() {
        var icon = weather.GetWeatherIcon("Rain");

        expect(icon === "images/icons/rain.svg").toBe(true);
    });

    it("Haze icon is correct", function() {
        var icon = weather.GetWeatherIcon("Haze");

        expect(icon === "images/icons/cloudysunny.svg").toBe(true);
    });

    it("Clouds icon is correct", function() {
        var icon = weather.GetWeatherIcon("Clouds");

        expect(icon === "images/icons/cloudy.svg").toBe(true);
    });

    it("Mist icon is correct", function() {
        var icon = weather.GetWeatherIcon("Mist");

        expect(icon === "images/icons/wind.svg").toBe(true);
    });

    it("Fog icon is correct", function() {
        var icon = weather.GetWeatherIcon("Fog");

        expect(icon === "images/icons/dust.svg").toBe(true);
    });

    it("Dust icon is correct", function() {
        var icon = weather.GetWeatherIcon("Dust");

        expect(icon === "images/icons/dust.svg").toBe(true);
    });

    it("Snow icon is correct", function() {
        var icon = weather.GetWeatherIcon("Snow");

        expect(icon === "images/icons/snow.svg").toBe(true);
    });
});

describe("Weather App - Temperature", function() {
    it("Temperature(cold) is correct", function() {
        var icon = weather.GetTemperatureRange(4);

        expect(icon === "cold").toBe(true);
    });

    it("Temperature(medium) is correct", function() {
        var icon = weather.GetTemperatureRange(10);

        expect(icon === "medium").toBe(true);
    });

    it("Temperature(hot) is correct", function() {
        var icon = weather.GetTemperatureRange(16);

        expect(icon === "hot").toBe(true);
    });
});
