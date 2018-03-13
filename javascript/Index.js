/*global RemoveCitiesFromStorage GetCitiesFromStorage GetAndDisplayWeatherDataForCity PageSize GetSummaryWeatherForCities ClearWeatherBannerDetails */

$(document).ready(function(){

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

            var newCity = $(".js-new-cities-select-list option:selected").text();
            var newCityId = $(".js-new-cities-select-list").val();

            if (parseInt(newCityId) !== 0) {
                GetSummaryWeatherForCities(newCityId, false);
                GetAndDisplayWeatherDataForCity(newCity); 

                $(".js-new-cities-select-list select").val(0);
            } else {
                alert("Please select a city");
            }
        }); 
});