/* global google charts */

var storedCities = [];
var currentCityName;
var currentCityResult = null;
var favouriteCities = [];

var weather = {
    RemoveCitiesFromStorage: function() {    
        window.localStorage.removeItem("Cities");
    },

    GetCitiesFromStorage: function() {
        var cityStorage = localStorage.getItem("Cities");

        if (cityStorage !== null) {
            storedCities = localStorage.getItem("Cities").split(",");
        } else { 
            storedCities = [2643743, 4219762, 5128638, 6167865, 2950158, 292223];
            weather.SaveCitiesToStorage(storedCities);
        }

        return storedCities;
    },

    SaveCitiesToStorage: function(newCities) {
        ////Find method
        //if (favouriteCities.find(x => x.id === parseInt(newCities)) === undefined) {
        //    storedCities.push(newCities[i]);
        //}

        for (var i = 0 ; i < newCities.length; i++) {
            if (storedCities.indexOf(newCities[i]) === -1) {
                storedCities.push(newCities[i]);
            }
        }

        window.localStorage.setItem("Cities", storedCities);
    },

    SetCurrentCityName: function(city) {
        currentCityName = city;
    },

    IsCityInArray: function(cityId) {
        ////Find method
        //if (favouriteCities.find(x => x.id === cityId) === undefined) {
        //    return false;
        //} else {
        //    return true;
        //}

        for (var i = 0 ; i < favouriteCities.length; i++) {
            if (favouriteCities[i].id === cityId) {
                return true;
            }
        }

        return false;
    },

    AddNewCityToArray: function(city) {
        if (weather.IsCityInArray(city.id)) {
            return;
        }

        var favouriteCity = { 
            id: city.id,
            name: city.name,
            weather: "Current weather is" + city.weather,
            icon: weather.GetWeatherIcon(city.weather),
            temperature: city.temperature,
            temprange: "c-city-widget-temperature-" + weather.GetTemperatureRange(city.temperature),
            tabindex: $(".js-city-list").length + 3,
            selected: false
        };

        favouriteCities.push(favouriteCity);
    },

    GetSummaryWeatherForCities: function(cityIds, loadFirstCityWeather) {
        $.getJSON("http://api.openweathermap.org/data/2.5/group?APPID=2e7d0233a8dffc4366669ec64ea59731&units=metric&id=" + cityIds,
            function(result){  
                ////ForEach method
                //result.list.forEach(function(d) {
                //    var city = {
                //        id: d.id, 
                //        name: d.name, 
                //        temperature: d.main.temp, 
                //        weather: d.weather[0].main,
                //        selected: false
                //    };

                //    AddNewCityToArray(city);
                //});

                for (var i = 0; i < result.cnt; i++) {
                    var city = {
                        id: result.list[i].id, 
                        name: result.list[i].name, 
                        temperature: result.list[i].main.temp, 
                        weather: result.list[i].weather[0].main,
                        selected: false
                    };

                    weather.AddNewCityToArray(city);
                }

                if (loadFirstCityWeather === true) {
                    favouriteCities[0].selected = true;
                    weather.GetAndDisplayWeatherDataForCity(favouriteCities[0].name); 
                } else {
                    weather.SelectCity(currentCityName);
                }
            });
    },

    GetAndDisplayWeatherDataForCity: function(city) {
        $.getJSON("http://api.openweathermap.org/data/2.5/forecast?APPID=2e7d0233a8dffc4366669ec64ea59731&q=" + city,
            function(result){  
                var citySummary = weather.GetSummaryForCity(city);

                currentCityName = result.city.name;

                weather.SetWeatherBannerDetails(citySummary);

                currentCityResult = result;

                weather.DrawCharts();
            });
    },

    SelectCity: function(city) {
        ////ForEach method
        //favouriteCities.forEach(function(d) {
        //    d.selected = false;
        //});

        ////Find method
        //favouriteCities.find(x => x.name ===city).selected = true;;
        
        for (var i = 0; i < favouriteCities.length; i++) {
            favouriteCities[i].selected = false;

            if (favouriteCities[i].name === city) {
                favouriteCities[i].selected = true;
            }
        }
    },

    GetSummaryForCity: function(city) {
        ////Find method
        //return favouriteCities.find(x => x.name ===city);

        for (var i = 0; i < favouriteCities.length; i++) {
            if (favouriteCities[i].name === city)
                return favouriteCities[i];
        }
    },

    GetWeatherIcon: function(weather) {
        switch (weather) {
            case "Clear":
                return "images/icons/sunny.svg";
            case "Drizzle":
                return "images/icons/shower.svg";
            case "Rain":
                return "images/icons/rain.svg";
            case "Haze":
                return "images/icons/cloudysunny.svg";
            case "Clouds":
                return "images/icons/cloudy.svg";
            case "Mist":
                return "images/icons/wind.svg";
            case "Fog":
            case "Dust":
                return "images/icons/dust.svg";
            case "Snow":
                return "images/icons/snow.svg";
        }  
    },

    GetTemperatureRange: function(temperature) {
        if (temperature <= 5)
            return "cold";
        else if ((temperature > 5) && (temperature <= 15))
            return "medium";
        else if (temperature > 15)
            return "hot";
    },

    SetWeatherBannerDetails: function (citySummary) {
        $(".js-weather-entries-fieldset-legend").text("Weather for your selected city '" + citySummary.name + "'");
        $(".js-weather-details-banner-city-name").text(citySummary.name);
        $(".js-weather-details-banner-weather-icon").attr("src", citySummary.icon);
        $(".js-weather-details-banner-weather-icon").attr("alt", "Current weather in" + citySummary.name + "is" + citySummary.weather);
        $(".js-weather-details-banner-weather-temperature").html(citySummary.temperature.toFixed(1) + " &deg;C");

        $(".js-weather-details-banner-weather-temperature").removeClass("c-city-widget-temperature-cold");
        $(".js-weather-details-banner-weather-temperature").removeClass("c-city-widget-temperature-medium");
        $(".js-weather-details-banner-weather-temperature").removeClass("c-city-widget-temperature-hot");

        $(".js-weather-details-banner-weather-temperature").addClass("c-city-widget-temperature-" + weather.GetTemperatureRange(citySummary.temperature.toFixed(1)));
    },

    ClearWeatherBannerDetails: function() {
        
        var citySummary = {
            name: "No city selected", 
            temperature: 0,
            weather: ""
        };

        weather.SetWeatherBannerDetails(citySummary);
    },

    DrawCharts: function() {
        google.charts.setOnLoadCallback(charts.drawTemperatureChart(currentCityResult));
        google.charts.setOnLoadCallback(charts.drawHumidityChart(currentCityResult));
        google.charts.setOnLoadCallback(charts.drawWindSpeedChart(currentCityResult));
    }
};