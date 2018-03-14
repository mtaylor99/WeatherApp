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
                temperature: 9.6
            },
            { 
                id: 1, 
                name: "New York",
                temperature: 9.6
            },
            { 
                id: 2, 
                name: "Dublin",
                temperature: 9.6
            }
        ]
    }
});