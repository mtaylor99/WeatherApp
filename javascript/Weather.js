/* global google drawTemperatureChart drawHumidityChart drawWindSpeedChart */
/* eslint-disable no-unused-vars */

var bannerHeight = null;
var storedCities = [];
var currentCityName;
var currentCityResult = null;
var favouriteCities = [];
 
function CheckPageSize() {
    //We need to monitor media query changes, to re-draw the Google Charts.

    if (bannerHeight === null) {
        bannerHeight = $(".c-weather-app-banner").height();
    } else if (bannerHeight !== $(".c-weather-app-banner").height()) {
        DrawCharts();
    }
}

function RemoveCitiesFromStorage() {    
    window.localStorage.removeItem("Cities");
}

function GetCitiesFromStorage() {
    var cityStorage = localStorage.getItem("Cities");

    if (cityStorage !== null) {
        storedCities = localStorage.getItem("Cities").split(",");
    } else { 
        storedCities = [2643743, 4219762, 5128638, 6167865, 2950158, 292223];
        SaveCitiesToStorage(storedCities);
    }

    return storedCities;
}

function SaveCitiesToStorage(newCities) {
    for (var i = 0 ; i < newCities.length; i++) {
        if (storedCities.indexOf(newCities[i]) === -1) {
            storedCities.push(newCities[i]);
        }
    }

    window.localStorage.setItem("Cities", storedCities);
}

function AddNewCityToArray(city) {
    var favouriteCity = { 
        id: city.id,
        name: city.name,
        icon: GetWeatherIcon(city.weather),
        temperature: city.temperature,
        temprange: "c-city-widget-temperature-" + GetTemperatureRange(city.temperature),
        tabindex: $(".js-city-list").length + 3,
        selected: false
    };

    favouriteCities.push(favouriteCity);
}

function SelectCity(city) {
    for (var i = 0; i < favouriteCities.length; i++) {
        favouriteCities[i].selected = false;

        if (favouriteCities[i].name === city) {
            favouriteCities[i].selected = true;
        }
    }
}

function GetSummaryForCity(city) {
    for (var i = 0; i < favouriteCities.length; i++) {
        if (favouriteCities[i].name === city)
            return favouriteCities[i];
    }
}

function GetWeatherIcon(weather) {
    switch (weather) {
        case "Clear":
            return "images/icons/sunny.svg";
        case "Drizzle":
            return "images/icons/shower.svg";
        case "Rain":
            return "images/icons/rain.svg";
        case "Haze":
            return "images/icons/cloudysunny.svg";
        case "Clouds":
            return "images/icons/cloudy.svg";
        case "Mist":
            return "images/icons/wind.svg";
        case "Fog":
        case "Dust":
            return "images/icons/dust.svg";
        case "Snow":
            return "images/icons/snow.svg";
    }  
}

function GetTemperatureRange(temperature) {
    if (temperature <= 5)
        return "cold";
    else if ((temperature > 5) && (temperature <= 15))
        return "medium";
    else if (temperature > 15)
        return "hot";
}

function ClearWeatherBannerDetails() {
    
    var citySummary = {
        name: "No city selected", 
        temperature: 0,
        weather: "" 
    };

    SetWeatherBannerDetails(citySummary);
}

function SetWeatherBannerDetails(citySummary) {
    $(".js-weather-entries-fieldset-legend").text("Weather for your selected city '" + citySummary.name + "'");
    $(".js-weather-details-banner-city-name").text(citySummary.name);
    $(".js-weather-details-banner-weather-icon").attr("src",GetWeatherIcon(citySummary.weather));
    $(".js-weather-details-banner-weather-temperature").html(citySummary.temperature.toFixed(1) + " &deg;C");
}

function GetSummaryWeatherForCities(cityIds, loadFirstCityWeather) {
    $.getJSON("http://api.openweathermap.org/data/2.5/group?APPID=2e7d0233a8dffc4366669ec64ea59731&units=metric&id=" + cityIds,
        function(result){  
            var newTabIndex = $(".js-city-list").length + 3;

            for (var i = 0; i < result.cnt; i++) {
                var city = {
                    id: result.list[i].id, 
                    name: result.list[i].name, 
                    temperature: result.list[i].main.temp, 
                    weather: result.list[i].weather[0].main,
                    selected: false
                };

                AddNewCityToArray(city);
            }

            if (loadFirstCityWeather === true) {
                favouriteCities[0].selected = true;
                GetAndDisplayWeatherDataForCity(favouriteCities[0].name); 
            } else {
                SelectCity(currentCityName);
            }
        });
}

function GetAndDisplayWeatherDataForCity(city) {
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast?APPID=2e7d0233a8dffc4366669ec64ea59731&q=" + city,
        function(result){  
            var citySummary = GetSummaryForCity(city);

            currentCityName = result.city.name;

            SetWeatherBannerDetails(citySummary);

            currentCityResult = result;

            DrawCharts();
        });
}

function DrawCharts() {
    google.charts.setOnLoadCallback(drawTemperatureChart(currentCityResult));
    google.charts.setOnLoadCallback(drawHumidityChart(currentCityResult));
    google.charts.setOnLoadCallback(drawWindSpeedChart(currentCityResult));
}
