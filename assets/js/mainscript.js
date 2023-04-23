var apiKey = "485d8029f9463fb9427a7793559846d9";
//user input concatenated into a string
var city = document.getElementById("user-input");
var search = document.getElementById("search");


//when you click search the city is stored
//displaying city info based off user input
search.addEventListener("click", function(event) {
    event.preventDefault();
    cityInput = document.getElementById("user-input").value;  
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial" + "&appid=" + apiKey;
    
    if (cityInput = "") {
        alert("Please enter a city name")
    } else
        fetch(queryURL, {method: "GET"}) 
        .then(function(response) {
            console.log(response);
         return response.json();
        })
        .then(function(data) {
            console.log(data);
                  
        })
        localStorage.setItem("cityInput", cityInput);
}) 

//render weather data
function renderWeather() {
    document.querySelector("#weather-forecast")
}


