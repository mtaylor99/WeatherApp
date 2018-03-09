/*global RemoveCitiesFromStorage GetAndDisplayWeatherData SaveCitiesToStorage GetCitiesFromStorage DisplayCitiesList GetSummaryWeatherForCities */

$(document).ready(function(){

    var cityIds = GetCitiesFromStorage();

    GetSummaryWeatherForCities(cityIds);

    $( ".js-add-new-city-dialog" ).dialog({
        autoOpen: false
    });

    $(".js-clear-saved-cities-button").unbind("click")
        .bind("click", function() {
            RemoveCitiesFromStorage();
            $(".c-city-widget").remove();
            $(".js-weather-entries-table tbody tr").remove();
        });

    $(".js-add-new-city-button").unbind("click")
        .bind("click", function() {
            $(".js-add-new-city-dialog" ).dialog("open");


            /* var newCityName = $(".js-add-new-city-text").val();
            var newTabIndex = $(".js-city-list").length + 3;
            var html = "<div class=\"c-city-widget \"><button class=\"js-city-list\" alt=" + newCityName + "\" tabindex=\"" + newTabIndex + "\">" + newCityName + "</button></div>";

            SaveCitiesToStorage(newCityName);
            $(".js-weather-cities-list").append(html);
            GetAndDisplayWeatherData(newCityName); */
        });

    $(".js-cancel-new-city-button").unbind("click")
        .bind("click", function() {
            $(".js-add-new-city-dialog" ).dialog("close");
        });    
});