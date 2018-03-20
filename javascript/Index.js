/*global google weather */

google.charts.load("current", {packages: ["corechart","line"]});  

$(document).ready(function(){

    var id;
    var cityIds = weather.GetCitiesFromStorage();
    
    $(window).resize(function() {
        clearTimeout(id);
        id = setTimeout(weather.DrawCharts, 500);
    });

    weather.GetSummaryWeatherForCities(cityIds, true);

    $(".js-clear-favourite-cities-button").unbind("click")
        .bind("click", function() {
            weather.RemoveCitiesFromStorage();

            weather.ClearWeatherBannerDetails();

            $(".c-city-widget").remove();
            $(".js-weather-details-temperature-chart").empty();
            $(".js-weather-details-humidity-chart").empty();
            $(".js-weather-details-wind-speed-chart").empty();
        });

    $(".js-add-favourite-cities-button").unbind("click")
        .bind("click", function() {
            $(".js-add-favourite-cities-validation").addClass("u-hidden");

            var newCity = $(".js-new-cities-select-list option:selected").text();
            var newCityId = $(".js-new-cities-select-list").val();

            if (parseInt(newCityId) !== 0) {
                weather.GetSummaryWeatherForCities(newCityId, false);
                weather.GetAndDisplayWeatherDataForCity(newCity); 

                var city = [];

                city.push(newCityId);
                weather.SaveCitiesToStorage(city);

                weather.SetCurrentCityName(newCity);
            } else {
                $(".js-add-favourite-cities-validation").removeClass("u-hidden");
            }
        }); 
});