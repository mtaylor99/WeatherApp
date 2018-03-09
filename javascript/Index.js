/*global RemoveCitiesFromStorage GetAndDisplayWeatherData SaveCitiesToStorage GetCitiesFromStorage DisplayCitiesList GetSummaryWeatherForCities */

$(document).ready(function(){

    GetCitiesFromStorage();
    //DisplayCitiesList();
    GetSummaryWeatherForCities("2643743,4219762,5128638,6167865,3614789,292223");
    GetAndDisplayWeatherData("London"); 

    $(".js-clear-saved-cities-button").unbind("click")
        .bind("click", function() {
            RemoveCitiesFromStorage();
            $(".cityWidget").remove();
            $(".js-weather-entries-table tbody tr").remove();
        });

    $(".js-add-new-city-button").unbind("click")
        .bind("click", function() {
            var newCityName = $(".js-add-new-city-text").val();
            var newTabIndex = $(".js-city-list").length + 3;
            var html = "<div class=\"cityWidget\"><button class=\"js-city-list\" alt=" + newCityName + "\" tabindex=\"" + newTabIndex + "\">" + newCityName + "</button></div>";

            SaveCitiesToStorage(newCityName);
            $(".js-weather-cities-list").append(html);
            GetAndDisplayWeatherData(newCityName);
        });


});