/* global Vue */

var cities = [
    { 
        name: "London",
        icon: "images/icons/sunny.svg",
        temperature: 8.2,
        temprange: "c-city-widget-temperature-medium"
    },
    { 
        name: "Rome",
        icon: "images/icons/sunny.svg",
        temperature: 0.4,
        temprange: "c-city-widget-temperature-cold"
    },
    { 
        name: "New York",
        icon: "images/icons/snow.svg",
        temperature: -3.0,
        temprange: "c-city-widget-temperature-cold"
    },
    { 
        name: "Toronto",
        icon: "images/icons/snow.svg",
        temperature: -1.8,
        temprange: "c-city-widget-temperature-cold"
    },
    { 
        name: "Berlin",
        icon: "images/icons/sunny.svg",
        temperature: 3.4,
        temprange: "c-city-widget-temperature-medium"
    },
    { 
        name: "Dubai",
        icon: "images/icons/wind.svg",
        temperature: 26.5,
        temprange: "c-city-widget-temperature-hot"
    }
];

Vue.component("city-widget", {
    props: ["city"],
    template: "<div class=\"c-city-widget\">" +
              "    <button id=\"{{ city.name }}\" class=\"js-city-list c-city-widget-button\" alt=\"{{ city.name }}\" tabindex=\"3\">" +
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


