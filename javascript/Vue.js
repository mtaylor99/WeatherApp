/* eslint-disable no-unused-vars */
/* global Vue GetAndDisplayWeatherDataForCity favouriteCities */

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
              "    <button id=\"{{ city.name }}\" class=\"js-city-list c-city-widget-button\" alt=\"{{ city.name }}\" tabindex=\"{{ city.tabindex }}\" v-on:click=\"onCityWidgetClick\">" +
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
    el: ".vue-city-widgets",
    data: {
        cities: favouriteCities
    }
});


