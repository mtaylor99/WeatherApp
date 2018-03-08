var cities;
var currentCityName;
var cityWeatherResults;

$(document).ready(function(){

    function LoadCitiesFromCookie() {
        cities = localStorage.getItem("Cities");

        if (cities === null) {
            cities = "London;Rome;New York;Toronto;Berlin;Dubai";
            window.localStorage.setItem("Cities", cities);
        }
    }

    function GetWeatherData(city) {
        //$.getJSON("http://api.openweathermap.org/data/2.5/forecast?APPID=8bfabc4405e188160d830fc5f133e398&id=" + city,
        $.getJSON("http://api.openweathermap.org/data/2.5/forecast?APPID=8bfabc4405e188160d830fc5f133e398&q=" + city,
            function(result){  
                currentCityName = result.city.name;
                cityWeatherResults = result.list;

                DisplayWeatherApp();

                DisplayWeatherAppVue();
            });
    }

    function PopulateCitiesList() {
        var cityList = cities.split(";");

        for (var i = 0; i < cityList.length; i++) {
            var html = "<div><button class=\"js-city-list\">" + cityList[i] + "</button></div>";

            $(".js-weather-cities-list").after(html);

        }
    }

    function  DisplayWeatherApp() {
        $(".js-weather-entries-table tr").remove(); 


        for (var i = 0; i < cityWeatherResults.length; i++) {
            var html = "<tr><td>" + currentCityName + "</td><td class=\"u-text-left\">" + cityWeatherResults[i].weather[0].description  + "</td><td>" + cityWeatherResults[i].weather[0].description + "</td></tr>";

            if (i === 0) {
                $(".js-weather-entries-table tbody:last").after(html);
            } else {
                $(".js-weather-entries-table tr:last").after(html);
            }
        }
    }

    function DisplayWeatherAppVue() {
        var app = new Vue({
            el: "#app",
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

    LoadCitiesFromCookie();
    PopulateCitiesList();
    GetWeatherData("London");
    
    $(".js-city-list").unbind("click")
        .bind("click", function() {
        //Some code
            GetWeatherData(event.srcElement.textContent);
        });
});