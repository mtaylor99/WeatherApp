/* eslint-disable no-unused-vars */
/* global Vue weather favouriteCities */

Vue.component("city-widget", {
    props: ["city"],
    methods: {
        onCityWidgetClick: function() { 
            weather.SelectCity(this.city.name);

            weather.GetAndDisplayWeatherDataForCity(this.city.name);
        }
    },
    template: "<div class=\"c-city-widget\">" +
              "    <button id=\"{{ city.name }}\" " +
              "v-bind:class=\"{'js-city-list':true, 'c-city-widget-button':true, 'c-city-widget-selected':(city.selected)}\"" +
              " alt=\"{{ city.name }}\" tabindex=\"{{ city.tabindex }}\" v-on:click=\"onCityWidgetClick\">" +
              "        <div class=\"c-city-widget-city\">" +
              "            <label>{{ city.name }}</label>" +
              "        </div>" +
              "        <br/>" +
              "        <div class=\"c-city-widget-weather-icon\">" +
              "            <img v-bind:src=\"city.icon\" v-bind:alt=\"city.weather\" />" +
              "        </div>" +
              "        <br/>"  +
              "        <div>" +
              "            <label v-bind:class=\"city.temprange\">{{ city.temperature }} &deg;C</label>" +
              "        </div>" +
              "    </button>" +
              "</div>"
});

var vueApp = new Vue({
    el: ".vue-city-widgets",
    data: {
        cities: favouriteCities
    }
});


