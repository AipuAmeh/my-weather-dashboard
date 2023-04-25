var apiKey = "485d8029f9463fb9427a7793559846d9";
//user input concatenated into a string

var search = document.getElementById("search");

var date = new Date().toLocaleDateString();
console.log(date);
//render weather data at top of page
//history list that saves to side of page

//when you click search the city is stored
//displaying city info based off user input
search.addEventListener("click", function(event) {
    event.preventDefault();
    var cityInput = document.getElementById("user-input").value;  
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
            
            var featuredWeather = document.querySelector(".weather-features");
            
            var cityName = document.createElement("h2");
            cityName.textContent = data.name;
            console.log(data.name);
            // var iconLink = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
           
            var icon = data.weather[0].icon;
            console.log(icon);
            featuredWeather.append(cityName);
            cityName.append(" " + date + " ");
            
            var weatherDetails = document.querySelector("#weather-details");

            var temp = document.createElement("li");
            temp.textContent = "Temp: " + data.main.temp + " \xB0" + "F";
            weatherDetails.append(temp);
            featuredWeather.append(weatherDetails);

            var humidity = document.createElement("li");
            humidity.textContent = "Humidity: " + data.main.humidity + " %";
            weatherDetails.append(humidity)
            featuredWeather.append(weatherDetails);

            var wind = document.createElement("li");
            wind.textContent = "Wind: " + data.wind.speed + " MPH";
            weatherDetails.append(wind);
            featuredWeather.append(weatherDetails);

            localStorage.setItem("cityInput",JSON.stringify(data.name));
        })
     fiveDayForecast(); 
}) 

//function for 5 day forecast
//new api url to be called 
function fiveDayForecast() {
    var city = document.getElementById("user-input").value
    console.log(city);
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

    fetch(forecastURL, {method: "GET"})
    .then( function(forecast) {
        console.log(forecast);
        return forecast.json();
    })
    .then(function(forecastData) {
        console.log(forecastData);
    })
    
 
}


