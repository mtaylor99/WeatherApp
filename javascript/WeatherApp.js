/* eslint-disable no-unused-vars */

var cities;
var currentCityName;
var cityWeatherResults;
var citiesSummaryWeather = [];

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
        var html = "<div class=\"cityWidget\"><button class=\"js-city-list\" alt=" + cityList[i] + "\" tabindex=\"" + (i + 3) + "\">" + cityList[i] + "</button></div>";

        $(".js-weather-cities-list").append(html);
    }
}

function AddNewCityToList(name, temperature, weather) {   
    var html = [];
    var newTabIndex = $(".js-city-list").length + 3;
    
    html.push(
        "<div class=\"cityWidget\">",
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

function DisplaySummaryWeatherForCities() {
    for (var i = 0; i < citiesSummaryWeather.length; i++) {
        AddNewCityToList(citiesSummaryWeather[i][0], citiesSummaryWeather[i][1] , citiesSummaryWeather[i][2], i + 3);
    }

    $(".js-city-list").unbind("click")
        .bind("click", function() {
            GetAndDisplayWeatherData(event.srcElement.parentElement.id);
        });
}

function GetSummaryWeatherForCities(cityIds) {
    $.getJSON("http://api.openweathermap.org/data/2.5/group?APPID=8bfabc4405e188160d830fc5f133e398&units=metric&id=" + cityIds,
        function(result){  
            for (var i = 0; i < result.cnt; i++) {
                var citySummary = new Array();

                citySummary[0] =  result.list[i].name;
                citySummary[1] =  result.list[i].main.temp;
                citySummary[2] =  result.list[i].weather[0].main;
                citiesSummaryWeather.push(citySummary);
            }

            DisplaySummaryWeatherForCities();
        });
}

function GetAndDisplayWeatherData(city) {
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