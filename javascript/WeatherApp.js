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

    LoadCitiesFromCookie();
    PopulateCitiesList();
    GetWeatherData("London");
    
    $(".js-city-list").unbind("click")
        .bind("click", function() {
            GetWeatherData(event.srcElement.textContent);
        });

    $(".js-add-new-city-button").unbind("click")
        .bind("click", function() {

            var newCityName = $(".js-add-new-city-text").val();

            cities = localStorage.getItem("Cities");
            if (cities === null) {
                window.localStorage.setItem("Cities", newCityName);
            } else {
                window.localStorage.setItem("Cities", cities + ";" + newCityName);
            }
            

            var html = "<div><button class=\"js-city-list\">" + newCityName + "</button></div>";

            $(".js-weather-cities-list").after(html);

            GetWeatherData(newCityName);
        });

    $(".js-clear-saved-cities-button").unbind("click")
        .bind("click", function() {

            window.localStorage.removeItem("Cities");

            $(".js-city-list").remove();

            $(".js-weather-entries-table tbody tr").remove();
        });
     
});