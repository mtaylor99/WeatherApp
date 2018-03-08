/*global RemoveCitiesFromStorage GetAndDisplayWeatherData SaveCitiesToStorage GetCitiesFromStorage DisplayCitiesList */

$(document).ready(function(){

    GetCitiesFromStorage();
    DisplayCitiesList();
    GetAndDisplayWeatherData("London"); 

    $(".js-clear-saved-cities-button").unbind("click")
        .bind("click", function() {
            RemoveCitiesFromStorage();
            $(".js-city-list").remove();
            $(".js-weather-entries-table tbody tr").remove();
        });

    $(".js-city-list").unbind("click")
        .bind("click", function() {
            GetAndDisplayWeatherData(event.srcElement.textContent);
        });

    $(".js-add-new-city-button").unbind("click")
        .bind("click", function() {
            var newCityName = $(".js-add-new-city-text").val();
            var html = "<div><button class=\"js-city-list\">" + newCityName + "</button></div>";

            SaveCitiesToStorage(newCityName);
            $(".js-weather-cities-list").after(html);
            GetAndDisplayWeatherData(newCityName);
        });


});