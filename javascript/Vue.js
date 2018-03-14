/* global Vue */

Vue.component("city-widget", {
    // The city-widget component now accepts a "prop", which is like a custom attribute. This prop is called city.
    props: ["city"],
    template: "<div class=\"c-city-widget\">" +
              "    <button id=\"{{ city.name }}\" class=\"js-city-list c-city-widget-button\" alt=\"{{ city.name }}\" tabindex=\"3\">" +
              "        <div class=\"c-city-widget-city\">" +
              "            <label>{{ city.name }}</label>" +
              "        </div>" +
              "        <br/>" +
              "        <div class=\"c-city-widget-weather-icon\">" +
              "            <img src=\"images/icons/sunny.svg\"></img>" +
              "        </div>" +
              "        <br/>"  +
              "        <div>" +
              "            <label class=\"c-city-widget-temperature-medium\">{{ city.temperature }}&#8451</label>" +
              "        </div>" +
              "    </button>" +
              "</div>"
});

var vueApp = new Vue({
    el: ".js-city-widgets",
    data: {
        cities: [
            { 
                id: 0, 
                name: "London",
                icon: "images/icons/sunny.svg",
                temperature: 8.2
            },
            { 
                id: 1, 
                name: "Rome",
                icon: "images/icons/sunny.svg",
                temperature: 0.4
            },
            { 
                id: 2, 
                name: "New York",
                icon: "images/icons/snow.svg",
                temperature: -3.0
            },
            { 
                id: 3, 
                name: "Toronto",
                icon: "images/icons/snow.svg",
                temperature: -1.8
            },
            { 
                id: 4, 
                name: "Berlin",
                icon: "images/icons/sunny.svg",
                temperature: 3.4
            },
            { 
                id: 5, 
                name: "Dubai",
                icon: "images/icons/sunny.svg",
                temperature: 26.5
            }
        ]
    }
});