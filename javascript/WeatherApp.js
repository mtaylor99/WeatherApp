/* eslint-disable no-unused-vars */

const KELVIN_TO_CELSIUS = 273.15;

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
        cities = "2643743,4219762,5128638,6167865,2950158,292223";
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

function AddNewCityToArray(name, temperature, weather) {
    var city = {
        name: name, 
        temperature: temperature,
        weather: weather 
    };

    citiesSummaryWeather.push(city);
}

function GetSummaryForCity(city) {
    for (var i = 0; i < citiesSummaryWeather.length; i++) {
        if (citiesSummaryWeather[i].name === city)
        return citiesSummaryWeather[i];
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

function AddNewCityToList(name, temperature, weather) {   
    var html = [];
    var newTabIndex = $(".js-city-list").length + 3;

    html.push(
        "<div class=\"c-city-widget\">",
        "<button id=\"" + name + "\" class=\"js-city-list c-city-widget-button\" alt=" + name + "\" tabindex=\"" + newTabIndex + "\">",
        "<div class=\"c-city-widget-city\"><label>" + name + "</label></div>",
        "<br/>",
        "<div class=\"c-city-widget-weather-icon\"><img src=\"" + GetWeatherIcon(weather) + "\"></img></div>",
        "<br/>",
        "<div><label class=\"c-city-widget-temperature-" + GetTemperatureRange(temperature) + "\">" + temperature.toFixed(1) + " &#8451</label></div>",
        "</button>",
        "</div>"
    );

    $(".js-weather-cities-list").append(html.join(""));
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
                AddNewCityToArray(result.list[i].name, result.list[i].main.temp, result.list[i].weather[0].main);
                AddNewCityToList(result.list[i].name, result.list[i].main.temp, result.list[i].weather[0].main, newTabIndex + i + 3);
            }

            if (loadFirstCityWeather === true) {
                GetAndDisplayWeatherDataForCity($(".js-city-list")[0].id); 

                $(".c-city-widget").first().addClass("c-city-widget-selected");
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

function GetAndDisplayWeatherDataForCity(city) {
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast?APPID=8bfabc4405e188160d830fc5f133e398&q=" + city,
        function(result){  
            var citySummary = GetSummaryForCity(city);

            currentCityName = result.city.name;
            cityWeatherResults = result.list;

            DisplayWeatherAppJquery();
            DisplayWeatherAppVue();

            SetWeatherBannerDetails(citySummary);
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