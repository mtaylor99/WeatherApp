/* eslint-disable no-unused-vars */
/* global drawTemperatureChart drawHumidityChart */

var KELVIN_TO_CELSIUS = 273.15;

function GetDayOfWeek(t) {
    var dt = new Date(t * 1000);

    var weekday = new Array(7);
    
    weekday[0] =  "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    
    var n = weekday[dt.getDay()];

    return n;
}

function drawTemperatureChart(apiData) {
    // Define the chart to be drawn.
    var currentDay = "";
    var temperatureArray = [];

    var header = ["Day Of Week", "Temperature"];

    temperatureArray.push(header);

    for (var i = 0; i < apiData.list.length; i++) {
        var dayOfWeek = GetDayOfWeek(apiData.list[i].dt);
        var temperature = (apiData.list[i].main.temp - KELVIN_TO_CELSIUS);
        var row = [dayOfWeek, temperature];

        if (dayOfWeek !== currentDay) {
            temperatureArray.push(row);
            currentDay = dayOfWeek;
        } 
    }

    var data = google.visualization.arrayToDataTable(temperatureArray);
        
    // Set chart options
    var options = {
        //"title" : "Temperature for " + apiData.city.name,
        hAxis: {
            title: "Day Of Week"
        },
        vAxis: {
            title: "Temperature (C)"
        },   
        curveType: "function",
        pointsVisible: true	  
    };

    // Instantiate and draw the chart.
    var temperatureChart = new google.visualization.LineChart($(".c-weather-details-temperature-chart")[0]);

    temperatureChart.draw(data, options);
}

function drawHumidityChart(apiData) {
    // Define the chart to be drawn.
    var currentDay = "";
    var humidityArray = [];

    var header = ["Day Of Week", "Humidity"];

    humidityArray.push(header);

    for (var i = 0; i < apiData.list.length; i++) {
        var dayOfWeek = GetDayOfWeek(apiData.list[i].dt);
        var humidity = apiData.list[i].main.humidity;
        var row = [dayOfWeek, humidity];

        if (dayOfWeek !== currentDay) {
            humidityArray.push(row);
            currentDay = dayOfWeek;
        } 
    }

    var data = google.visualization.arrayToDataTable(humidityArray);
        
    // Set chart options
    var options = {
        //"title" : "Humidity for " + apiData.city.name,
        hAxis: {
            title: "Day Of Week"
        },
        vAxis: {
            title: "Humidity (%)"
        },   
        curveType: "function",
        pointsVisible: true	  
    };

    // Instantiate and draw the chart.
    var humidityChart = new google.visualization.LineChart($(".c-weather-details-humidity-chart")[0]);

    humidityChart.draw(data, options);
}

function drawWindSpeedChart(apiData) {
    // Define the chart to be drawn.
    var currentDay = "";
    var windSpeedArray = [];

    var header = ["Day Of Week", "Wind Speed"];

    windSpeedArray.push(header);

    for (var i = 0; i < apiData.list.length; i++) {
        var dayOfWeek = GetDayOfWeek(apiData.list[i].dt);
        var windSpeed = apiData.list[i].wind.speed;
        var row = [dayOfWeek, windSpeed];

        if (dayOfWeek !== currentDay) {
            windSpeedArray.push(row);
            currentDay = dayOfWeek;
        } 
    }

    var data = google.visualization.arrayToDataTable(windSpeedArray);
        
    // Set chart options
    var options = {
        //"title" : "Wind speed for " + apiData.city.name,
        hAxis: {
            title: "Day Of Week"
        },
        vAxis: {
            title: "Wind Speed (mph)"
        },   
        curveType: "function",
        pointsVisible: true	  
    };

    // Instantiate and draw the chart.
    var windSpeedChart = new google.visualization.LineChart($(".c-weather-details-wind-speed-chart")[0]);

    windSpeedChart.draw(data, options);
}

