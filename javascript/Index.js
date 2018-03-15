/*global SetCurrentCityName DrawCharts RemoveCitiesFromStorage GetCitiesFromStorage GetAndDisplayWeatherDataForCity SaveCitiesToStorage GetSummaryWeatherForCities ClearWeatherBannerDetails */

var bannerHeight = null;

function CheckPageSize() {
    //We need to monitor media query changes, to re-draw the Google Charts.

    if (bannerHeight === null) {
        bannerHeight = $(".c-weather-app-banner").height();
    } else if (bannerHeight !== $(".c-weather-app-banner").height()) {
        DrawCharts();
    }
}

$(document).ready(function(){
    CheckPageSize();
    $(window).resize(CheckPageSize);

    var cityIds = GetCitiesFromStorage();

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