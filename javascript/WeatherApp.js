/* eslint-disable no-unused-vars */

var cities;
var currentCityName;
var cityWeatherResults;

function RemoveCitiesFromStorage() {    
    window.localStorage.removeItem("Cities");
}

function GetCitiesFromStorage() {
    cities = localStorage.getItem("Cities");

    if (cities === null) {
        cities = "London;Rome;New York;Toronto;Berlin;Dubai";
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

function DisplayCitiesList() {
    var cityList = GetCitiesFromStorage().split(";");

    for (var i = 0; i < cityList.length; i++) {
        var html = "<div><button class=\"js-city-list\" alt=" + cityList[i] + "\" tabindex=\"" + (i + 3) + "\">" + cityList[i] + "</button></div>";

        $(".js-weather-cities-list").after(html);
    }
}

function GetAndDisplayWeatherData(city) {
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast?APPID=8bfabc4405e188160d830fc5f133e398&q=" + city,
        function(result){  
            currentCityName = result.city.name;
            cityWeatherResults = result.list;

            DisplayWeatherAppJquery();
            DisplayWeatherAppVue();
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