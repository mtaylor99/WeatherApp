/*global RemoveCitiesFromStorage GetAndDisplayWeatherData SaveCitiesToStorage GetCitiesFromStorage DisplayCitiesList */

$(document).ready(function(){

    GetCitiesFromStorage();
    DisplayCitiesList();
    GetAndDisplayWeatherData("London"); 

    $(".js-clear-saved-cities-button").unbind("click")
        .bind("click", function() {
            RemoveCitiesFromStorage();
            $(".cityWidget").remove();
            $(".js-weather-entries-table tbody tr").remove();
        });

    $(".js-city-list").unbind("click")
        .bind("click", function() {
            GetAndDisplayWeatherData(event.srcElement.textContent);
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