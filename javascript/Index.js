/*global RemoveCitiesFromStorage GetCitiesFromStorage GetAndDisplayWeatherDataForCity PageSize GetSummaryWeatherForCities */

$(document).ready(function(){

    var cityIds = GetCitiesFromStorage();

    PageSize();

    GetSummaryWeatherForCities(cityIds, true);

    $(window).resize(PageSize);

    $( ".js-add-new-city-dialog" ).dialog({
        autoOpen: false,
        dialogClass: "c-add-new-city-dialog"
    });

    $(".js-clear-favourite-cities-button").unbind("click")
        .bind("click", function() {
            RemoveCitiesFromStorage();
            $(".c-city-widget").remove();
            $(".js-weather-entries-table tbody tr").remove();
        });

    $(".js-manage-favourite-cities-button").unbind("click")
        .bind("click", function() {
            $(".js-add-new-city-dialog" ).dialog("open");
        });

    $(".js-add-new-city-button").unbind("click")
        .bind("click", function() {
            var newCity = $(".js-new-cities-select-list option:selected").text();
            var newCityId = $(".js-new-cities-select-list").val();

            GetSummaryWeatherForCities(newCityId, false);

            $(".js-add-new-city-dialog" ).dialog("close");

            GetAndDisplayWeatherDataForCity(newCity); 
        });  

    $(".js-cancel-add-new-city-button").unbind("click")
        .bind("click", function() {
            $(".js-add-new-city-dialog" ).dialog("close");
        });    
});