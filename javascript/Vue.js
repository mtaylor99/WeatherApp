/* global Vue */

Vue.component("todo-item", {
    // The todo-item component now accepts a "prop", which is like a custom attribute. This prop is called todo.
    props: ["todo"],
    template: "<div class=\"c-city-widget\">" +
              "    <button id=\"{{ todo.name }}\" class=\"js-city-list c-city-widget-button\" alt=\"{{ todo.name }}\" tabindex=\"3\">" +
              "        <div class=\"c-city-widget-city\">" +
              "            <label>{{ todo.name }}</label>" +
              "        </div>" +
              "        <br/>" +
              "        <div class=\"c-city-widget-weather-icon\">" +
              "            <img src=\"images/icons/sunny.svg\"></img>" +
              "        </div>" +
              "        <br/>"  +
              "        <div>" +
              "            <label class=\"c-city-widget-temperature-medium\">{{ todo.temperature }}&#8451</label>" +
              "        </div>" +
              "    </button>" +
              "</div>"
});

var vueApp = new Vue({
    el: ".js-city-widgets",
    data: {
        groceryList: [
            { 
                id: 0, 
                text: "Vegetables",
                name: "London",
                temperature: 9.6
            },
            { 
                id: 1, 
                text: "Cheese",
                name: "New York",
                temperature: 9.6
            },
            { 
                id: 2, 
                text: "Whatever else humans are supposed to eat",
                name: "Dublin",
                temperature: 9.6
            }
        ]
    }
});