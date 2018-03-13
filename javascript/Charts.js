/* eslint-disable no-unused-vars */
/* global google drawTemperatureChart drawHumidityChart */

const KELVIN_TO_CELSIUS = 273.15;

google.charts.load("current", {packages: ["corechart","line"]});  

function GetDayOfWeek(t) {
    var dt = new Date(t*1000);

    var weekday = new Array(7);
    weekday[0] =  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    
    var n = weekday[dt.getDay()];

    return n;
}

function drawTemperatureChart(apiData) {
    // Define the chart to be drawn.
    var temperatureArray = [];

    var header = ["Date", "Min Temp", "Current", "Max Temp"];

    temperatureArray.push(header);

    for (var i = 0; i < apiData.list.length; i++) {
        if (i % 5 === 0) {
            var time = GetDayOfWeek(apiData.list[i].dt);
            var temp = apiData.list[i].main.temp - KELVIN_TO_CELSIUS;
            var minTemp = apiData.list[i].main.temp_min - KELVIN_TO_CELSIUS;
            var maxTemp = apiData.list[i].main.temp_max - KELVIN_TO_CELSIUS;
            var row = [time, minTemp, temp, maxTemp];

            temperatureArray.push(row);
        }
    }

    var data = google.visualization.arrayToDataTable(temperatureArray);
        
    // Set chart options
    var options = {
        "title" : "Temperature for " + apiData.city.name,
        hAxis: {
            title: "Month"
        },
        vAxis: {
            title: "Temperature"
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
    var humidityArray = [];

    var header = ["Date", "Humidity"];

    humidityArray.push(header);

    for (var i = 0; i < apiData.list.length; i++) {
        if (i % 5 === 0) {
            var time = GetDayOfWeek(apiData.list[i].dt);
            var humidity = apiData.list[i].main.humidity;
            var row = [time, humidity];

            humidityArray.push(row);
        }
    }

    var data = google.visualization.arrayToDataTable(humidityArray);
        
    // Set chart options
    var options = {
        "title" : "Humidity for " + apiData.city.name,
        hAxis: {
            title: "Month"
        },
        vAxis: {
            title: "Humidity"
        },   
        curveType: "function",
        pointsVisible: true	  
    };

    // Instantiate and draw the chart.
    var humidityChart = new google.visualization.LineChart($(".c-weather-details-humidity-chart")[0]);

    humidityChart.draw(data, options);
}

