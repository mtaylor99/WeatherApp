/*global google SetCurrentCityName DrawCharts RemoveCitiesFromStorage GetCitiesFromStorage GetAndDisplayWeatherDataForCity SaveCitiesToStorage GetSummaryWeatherForCities ClearWeatherBannerDetails */

google.charts.load("current", {packages: ["corechart","line"]});  

$(document).ready(function(){

    var id;
    var cityIds = GetCitiesFromStorage();
    
    $(window).resize(function() {
        clearTimeout(id);
        id = setTimeout(DrawCharts, 500);
    });

    GetSummaryWeatherForCities(cityIds, true);

    $(".js-clear-favourite-cities-button").unbind("click")
        .bind("click", function() {
            RemoveCitiesFromStorage();

            ClearWeatherBannerDetails();

            $(".c-city-widget").remove();
            $(".js-weather-entries-table tbody tr").remove();
        });

    $(".js-add-favourite-cities-button").unbind("click")
        .bind("click", function() {
            $(".js-add-favourite-cities-validation").addClass("u-hidden");

            var newCity = $(".js-new-cities-select-list option:selected").text();
            var newCityId = $(".js-new-cities-select-list").val();

            if (parseInt(newCityId) !== 0) {
                GetSummaryWeatherForCities(newCityId, false);
                GetAndDisplayWeatherDataForCity(newCity); 

                var city = [];

                city.push(newCityId);
                SaveCitiesToStorage(city);

                SetCurrentCityName(newCity);
            } else {
                $(".js-add-favourite-cities-validation").removeClass("u-hidden");
            }
        }); 
});