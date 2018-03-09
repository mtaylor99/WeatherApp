/*global RemoveCitiesFromStorage GetAndDisplayWeatherData SaveCitiesToStorage GetCitiesFromStorage DisplayCitiesList GetSummaryWeatherForCities */

$(document).ready(function(){

    var cityIds = GetCitiesFromStorage();

    GetSummaryWeatherForCities(cityIds);

    $( ".js-add-new-city-dialog" ).dialog({
        autoOpen: false
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
            var newCityId = $(".js-new-cities-select-list").val();
            var newTabIndex = $(".js-city-list").length + 3;

            /*
            debugger;
            var html = "<div class=\"c-city-widget \"><button class=\"js-city-list\" alt=" + newCityId + "\" tabindex=\"" + newTabIndex + "\">" + newCityId + "</button></div>";

            SaveCitiesToStorage(newCityName);
            $(".js-weather-cities-list").append(html);
            GetAndDisplayWeatherData(newCityName);
            */
        });  

    $(".js-cancel-add-new-city-button").unbind("click")
        .bind("click", function() {
            $(".js-add-new-city-dialog" ).dialog("close");
        });    
});