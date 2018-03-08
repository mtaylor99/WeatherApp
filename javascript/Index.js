var cities;
var currentCityName;
var cityWeatherResults;

$(document).ready(function(){

    function LoadCitiesFromCookie() {
        cities = localStorage.getItem("Cities");

        if (cities === null) {
            cities = "London; Rome; New York; Toronto; Berlin; Dubai;"
            window.localStorage.setItem("Cities", cities);
        }
    }

    function GetWeatherData() {
        $.getJSON("http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=8bfabc4405e188160d830fc5f133e398",
            function(result){  
                currentCityName = result.city.name;
                cityWeatherResults = result.list;

                DisplayWeatherApp();
            });
    }

    function PopulateCitiesList() {
        var cityList = cities.split(";");

        for (var i = 0; i < cityList.length; i++) {
            var html = "<div>" + cityList[i] + "</div>";

            $(".js-weather-cities-list").after(html);

        }
    }

    function  DisplayWeatherApp() {
        for (var i = 0; i < cityWeatherResults.length; i++) {
            var html = "<tr><td>" + cityWeatherResults[i].weather[0].description + "</td><td class=\"u-text-left\">" + cityWeatherResults[i].weather[0].description  + "</td></tr>";

            if (i === 0) {
                $(".js-weather-entries-table tbody:last").after(html);
            } else {
                $(".js-weather-entries-table tr:last").after(html);
            }
        }
    }

    LoadCitiesFromCookie();
    PopulateCitiesList();
    GetWeatherData();
    
});