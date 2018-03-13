/* eslint-disable no-unused-vars */
/* global google drawTemperatureChart drawHumidityChart */

google.charts.load("current", {packages: ["corechart","line"]});  

function drawTemperatureChart(apiData) {
    // Define the chart to be drawn.
    var data = new google.visualization.DataTable();

    data.addColumn("string", "Month");
    data.addColumn("number", "Tokyo");
    data.addColumn("number", "Osaka");
    data.addColumn("number", "Berlin");
    data.addColumn("number", "London");
    data.addRows([
        ["Jan",  7.0, -0.2, -0.9, 3.9],
        ["Feb",  6.9, 0.8, 0.6, 4.2],
        ["Mar",  9.5,  5.7, 3.5, 5.7],
        ["Apr",  14.5, 11.3, 8.4, 8.5],
        ["May",  18.2, 17.0, 13.5, 11.9],
        ["Jun",  21.5, 22.0, 17.0, 15.2],      
        ["Jul",  25.2, 24.8, 18.6, 17.0],
        ["Aug",  26.5, 24.1, 17.9, 16.6],
        ["Sep",  23.3, 20.1, 14.3, 14.2],
        ["Oct",  18.3, 14.1, 9.0, 10.3],
        ["Nov",  13.9,  8.6, 3.9, 6.6],
        ["Dec",  9.6,  2.5,  1.0, 4.8]
    ]);
        
    // Set chart options
    var options = {
        "title" : "Temperature for " + apiData.city.name,
        hAxis: {
            title: "Month"
        },
        vAxis: {
            title: "Temperature"
        },   
        pointsVisible: true	  
    };

    // Instantiate and draw the chart.
    var temperatureChart = new google.visualization.LineChart($(".c-weather-details-temperature-chart")[0]);

    temperatureChart.draw(data, options);
}

function drawHumidityChart(apiData) {
    // Define the chart to be drawn.
    var data = new google.visualization.DataTable();

    data.addColumn("string", "Month");
    data.addColumn("number", "Tokyo");
    data.addColumn("number", "Osaka");
    data.addColumn("number", "Berlin");
    data.addColumn("number", "London");
    data.addRows([
        ["Jan",  7.0, -0.2, -0.9, 3.9],
        ["Feb",  6.9, 0.8, 0.6, 4.2],
        ["Mar",  9.5,  5.7, 3.5, 5.7],
        ["Apr",  14.5, 11.3, 8.4, 8.5],
        ["May",  18.2, 17.0, 13.5, 11.9],
        ["Jun",  21.5, 22.0, 17.0, 15.2],      
        ["Jul",  25.2, 24.8, 18.6, 17.0],
        ["Aug",  26.5, 24.1, 17.9, 16.6],
        ["Sep",  23.3, 20.1, 14.3, 14.2],
        ["Oct",  18.3, 14.1, 9.0, 10.3],
        ["Nov",  13.9,  8.6, 3.9, 6.6],
        ["Dec",  9.6,  2.5,  1.0, 4.8]
    ]);
        
    // Set chart options
    var options = {
        "title" : "Humidity for " + apiData.city.name,
        hAxis: {
            title: "Month"
        },
        vAxis: {
            title: "Humidity"
        },   
        pointsVisible: true	  
    };

    // Instantiate and draw the chart.
    var humidityChart = new google.visualization.LineChart($(".c-weather-details-humidity-chart")[0]);

    humidityChart.draw(data, options);
}

