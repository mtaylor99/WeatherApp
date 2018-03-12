/* eslint-disable no-unused-vars */

const KELVIN_TO_CELSIUS = 273.15;

var pageSize = "";
var cities;
var currentCityName;
var cityWeatherResults;
var citiesSummaryWeather = [];

//****************************************************************************************************************** */
// PAGE MANAGEMENT
//****************************************************************************************************************** */

function PageSize() {
    var mainContent = $(".g-main-content");

    if (mainContent.css("flex-direction") === "row") { //Web

        if (pageSize === "Mobile") {
            ReSizeContent("Web");
        }

        pageSize = "Web";
    } else {        
        if (pageSize === "Web") {
            ReSizeContent("Web");
        }

        pageSize = "Mobile";
    }
}

function ReSizeContent() {
    ;
}

//****************************************************************************************************************** */
// STORAGE MANAGEMENT
//****************************************************************************************************************** */

function RemoveCitiesFromStorage() {    
    window.localStorage.removeItem("Cities");
}

function GetCitiesFromStorage() {
    cities = localStorage.getItem("Cities");

    if (cities === null) {
        cities = "2643743,4219762,5128638,6167865,3614789,292223";
        SaveCitiesToStorage(cities);
    }

    return cities;
}

function SaveCitiesToStorage(cities) {
    var currentSavedCities = localStorage.getItem("Cities");

    if (currentSavedCities !== null) {
        currentSavedCities += ";" + cities;
    } else {
        currentSavedCities = cities;
    }

    window.localStorage.setItem("Cities", currentSavedCities);
}

//****************************************************************************************************************** */
// CITY LIST MANAGEMENT
//****************************************************************************************************************** */

function AddNewCityToArray(name, temperature, weather) {
    var citySummary = new Array();

    citySummary[0] =  name;
    citySummary[1] =  temperature;
    citySummary[2] =  weather;
    citiesSummaryWeather.push(citySummary);
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
        case "Dust":
            return "images/icons/dust.svg";
        case "Snow":
            return "images/icons/snow.svg";
    }  
}

function AddNewCityToList(name, temperature, weather) {   
    var html = [];
    var newTabIndex = $(".js-city-list").length + 3;

    html.push(
        "<div class=\"c-city-widget\">",
        "<button id=\"" + name + "\" class=\"js-city-list\" alt=" + name + "\" tabindex=\"" + newTabIndex + "\">",
        "<span class=\"c-city-widget-city\"><label>" + name + "</label></span>",
        "<br/>",
        "<span class=\"c-city-widget-weather-icon\"><img src=\"" + GetWeatherIcon(weather) + "\"></img></span>",
        "<br/>",
        "<span class=\"c-city-widget-temperature\"><label>" + temperature + " &#8451</label></span>",
        "</button>",
        "</div>"
    );

    $(".js-weather-cities-list").append(html.join(""));
}

function GetSummaryWeatherForCities(cityIds, loadFirstCityWeather) {
    $.getJSON("http://api.openweathermap.org/data/2.5/group?APPID=8bfabc4405e188160d830fc5f133e398&units=metric&id=" + cityIds,
        function(result){  
            var newTabIndex = $(".js-city-list").length + 3;

            for (var i = 0; i < result.cnt; i++) {
                AddNewCityToArray(result.list[i].name, result.list[i].main.temp, result.list[i].weather[0].main);
                AddNewCityToList(result.list[i].name, result.list[i].main.temp, result.list[i].weather[0].main, newTabIndex + i + 3);
            }

            if (loadFirstCityWeather === true) {
                GetAndDisplayWeatherDataForCity($(".js-city-list")[0].id); 
            }
            
            $(".js-city-list").unbind("click")
                .bind("click", function() {

                    $(".c-city-widget").removeClass("c-city-widget-selected");

                    GetAndDisplayWeatherDataForCity((this).closest("button").id);

                    $(this).closest(".c-city-widget")
                        .addClass("c-city-widget-selected");
                });
        });
}

//****************************************************************************************************************** */
// CITY WEATHER DETAILS
//****************************************************************************************************************** */

function GetAndDisplayWeatherDataForCity(city) {
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast?APPID=8bfabc4405e188160d830fc5f133e398&q=" + city,
        function(result){  
            currentCityName = result.city.name;
            cityWeatherResults = result.list;

            DisplayWeatherAppJquery();
            DisplayWeatherAppVue();

            $(".js-weather-entries-fieldset-legend").text("Weather for your selected city '" + city + "'");
            $(".js-weather-details-banner-city-name").text(currentCityName);
            $(".js-weather-details-banner-weather-icon").attr("src",GetWeatherIcon(result.list[1].weather[0].main));
            $(".js-weather-details-banner-weather-temperature").html((result.list[1].main.temp - KELVIN_TO_CELSIUS).toFixed(2) + " &#8451");
        });
}

function  DisplayWeatherAppJquery() {
    /* $(".js-weather-entries-table tbody tr").remove();

    for (var i = 0; i < cityWeatherResults.length; i++) {          
        var newRowContent = "<tr><td>" + currentCityName + "</td><td class=\"u-text-left\">" + cityWeatherResults[i].weather[0].description  + "</td><td>" + cityWeatherResults[i].weather[0].description + "</td></tr>";

        $(".js-weather-entries-table tbody").append(newRowContent); 
    } */
}

function DisplayWeatherAppVue() {
    var app = new Vue({
        el: ".js-vue-app",
        data: {
            todos: [
                { text: "Learn JavaScript" },
                { text: "Learn Vue" },
                { text: "Build something awesome" }
            ],
            weatherResults: cityWeatherResults,
            message: "Hello Vue!"
        }
    });
}