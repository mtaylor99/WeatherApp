/* global Vue */

var cities = [
    { 
        id: 2643743,
        name: "London",
        icon: "images/icons/sunny.svg",
        temperature: 8.2,
        temprange: "c-city-widget-temperature-medium"
    },
    { 
        id: 4219762,
        name: "Rome",
        icon: "images/icons/sunny.svg",
        temperature: 0.4,
        temprange: "c-city-widget-temperature-cold"
    },
    { 
        id: 5128638,
        name: "New York",
        icon: "images/icons/snow.svg",
        temperature: -3.0,
        temprange: "c-city-widget-temperature-cold"
    },
    { 
        id: 6167865,
        name: "Toronto",
        icon: "images/icons/snow.svg",
        temperature: -1.8,
        temprange: "c-city-widget-temperature-cold"
    },
    { 
        id: 2950158,
        name: "Berlin",
        icon: "images/icons/sunny.svg",
        temperature: 3.4,
        temprange: "c-city-widget-temperature-medium"
    },
    { 
        id: 292223,
        name: "Dubai",
        icon: "images/icons/wind.svg",
        temperature: 26.5,
        temprange: "c-city-widget-temperature-hot"
    }
];

Vue.component("city-widget", {
    props: ["city"],
    methods: {
        onCityWidgetClick: function() { 
            $(".c-city-widget").removeClass("c-city-widget-selected");

            GetAndDisplayWeatherDataForCity(this.city.name);

            $(this).closest(".c-city-widget")
                .addClass("c-city-widget-selected");
        }
    },
    template: "<div class=\"c-city-widget\">" +
              "    <button id=\"{{ city.name }}\" class=\"js-city-list c-city-widget-button\" alt=\"{{ city.name }}\" tabindex=\"3\" v-on:click=\"onCityWidgetClick\">" +
              "        <div class=\"c-city-widget-city\">" +
              "            <label>{{ city.name }}</label>" +
              "        </div>" +
              "        <br/>" +
              "        <div class=\"c-city-widget-weather-icon\">" +
              "            <img v-bind:src=\"city.icon\" />" +
              "        </div>" +
              "        <br/>"  +
              "        <div>" +
              "            <label v-bind:class=\"city.temprange\">{{ city.temperature }}&#8451</label>" +
              "        </div>" +
              "    </button>" +
              "</div>"
});

var vueApp = new Vue({
    el: ".js-city-widgets",
    data: {
        cities: cities
    }
});


