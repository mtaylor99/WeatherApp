/* eslint-disable no-unused-vars */

var cities;
var currentCityName;
var cityWeatherResults;
var citiesSummaryWeather = [];

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

function AddNewCityToList(name, temperature, weather) {   
    var html = [];
    var newTabIndex = $(".js-city-list").length + 3;
    
    html.push(
        "<div class=\"c-city-widget \">",
        "<button id=\"" + name + "\" class=\"js-city-list\" alt=" + name + "\" tabindex=\"" + newTabIndex + "\">",
        "<label>" + name + "</label>",
        "<br/>",
        "<label>Icon: " + weather  + "</label>",
        "<br/>",
        "<label>Temp (oC): " + temperature  + "</label>",
        "</button>",
        "</div>"
    );

    $(".js-weather-cities-list").append(html.join(""));
}

function GetSummaryWeatherForCities(cityIds) {
    $.getJSON("http://api.openweathermap.org/data/2.5/group?APPID=8bfabc4405e188160d830fc5f133e398&units=metric&id=" + cityIds,
        function(result){  
            for (var i = 0; i < result.cnt; i++) {
                AddNewCityToArray(result.list[i].name, result.list[i].main.temp, result.list[i].weather[0].main);
            }

            DisplaySummaryWeatherForCities();

            GetAndDisplayWeatherDataForCity($(".js-city-list")[0].id); 
        
        });
}

function DisplaySummaryWeatherForCities() {
    for (var i = 0; i < citiesSummaryWeather.length; i++) {
        AddNewCityToList(citiesSummaryWeather[i][0], citiesSummaryWeather[i][1] , citiesSummaryWeather[i][2], i + 3);
    }

    $(".js-city-list").unbind("click")
        .bind("click", function() {
            GetAndDisplayWeatherDataForCity(event.srcElement.parentElement.id);
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
        });
}

function  DisplayWeatherAppJquery() {
    $(".js-weather-entries-table tbody tr").remove();

    for (var i = 0; i < cityWeatherResults.length; i++) {          
        var newRowContent = "<tr><td>" + currentCityName + "</td><td class=\"u-text-left\">" + cityWeatherResults[i].weather[0].description  + "</td><td>" + cityWeatherResults[i].weather[0].description + "</td></tr>";

        $(".js-weather-entries-table tbody").append(newRowContent); 
    }
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