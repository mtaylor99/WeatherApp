/* global google drawTemperatureChart drawHumidityChart drawWindSpeedChart */
/* eslint-disable no-unused-vars */

var bannerHeight = null;
var cities = [];
var currentCityName;
var cityWeatherResults;
var favouriteCities = [];
 
function CheckPageSize() {
    //We need to monitor media query changes, to re-draw the Google Charts.

    if (bannerHeight === null) {
        bannerHeight = $(".c-weather-app-banner").height();
    } else if (bannerHeight !== $(".c-weather-app-banner").height()) {
        GetAndDisplayWeatherDataForCity(currentCityName);
    }
}

function RemoveCitiesFromStorage() {    
    window.localStorage.removeItem("Cities");
}

function GetCitiesFromStorage() {
    var cityStorage = localStorage.getItem("Cities");

    if (cityStorage !== null) {
        cities = localStorage.getItem("Cities").split(",");
    } else { 
        cities = [2643743, 4219762, 5128638, 6167865, 2950158, 292223];
        SaveCitiesToStorage(cities);
    }

    return cities;
}

function SaveCitiesToStorage(newCities) {
    for (var i = 0 ; i < newCities.length; i++) {
        if (cities.indexOf(newCities[i]) === -1) {
            cities.push(newCities[i]);
        }
    }

    window.localStorage.setItem("Cities", cities);
}

function AddNewCityToArray(city) {
    var favouriteCity = { 
        id: city.id,
        name: city.name,
        icon: GetWeatherIcon(city.weather),
        temperature: city.temperature,
        temprange: "c-city-widget-temperature-" + GetTemperatureRange(city.temperature),
        tabindex: $(".js-city-list").length + 3
    };

    favouriteCities.push(favouriteCity);
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
    $(".js-weather-details-banner-weather-temperature").html(citySummary.temperature.toFixed(1) + " &#8451");
}

function GetSummaryWeatherForCities(cityIds, loadFirstCityWeather) {
    $.getJSON("http://api.openweathermap.org/data/2.5/group?APPID=8bfabc4405e188160d830fc5f133e398&units=metric&id=" + cityIds,
        function(result){  
            var newTabIndex = $(".js-city-list").length + 3;

            for (var i = 0; i < result.cnt; i++) {
                var city = {
                    id: result.list[i].id, 
                    name: result.list[i].name, 
                    temperature: result.list[i].main.temp, 
                    weather: result.list[i].weather[0].main
                };

                AddNewCityToArray(city);
            }

            /* if (loadFirstCityWeather === true) {
                GetAndDisplayWeatherDataForCity($(".js-city-list")[0].id); 

                $(".c-city-widget").first()
                    .addClass("c-city-widget-selected");
            } */
        });
}

function GetAndDisplayWeatherDataForCity(city) {
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast?APPID=8bfabc4405e188160d830fc5f133e398&q=" + city,
        function(result){  
            var citySummary = GetSummaryForCity(city);

            currentCityName = result.city.name;
            cityWeatherResults = result.list;

            SetWeatherBannerDetails(citySummary);

            google.charts.setOnLoadCallback(drawTemperatureChart(result));
            google.charts.setOnLoadCallback(drawHumidityChart(result));
            google.charts.setOnLoadCallback(drawWindSpeedChart(result));
        });
}
