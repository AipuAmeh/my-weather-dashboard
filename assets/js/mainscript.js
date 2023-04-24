var apiKey = "485d8029f9463fb9427a7793559846d9";
//user input concatenated into a string
var city = document.getElementById("user-input");
var search = document.getElementById("search");

//render weather data at top of page


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
            var featuredWeather = document.querySelector(".weather-features");
            //city name and date in MM/DD/YYYY format
          //temp, wind, humidity
            // var date = dayjs().format("M/DD/YYYY");
           var cityName = document.createElement("h2");
            cityName.textContent = data.name;
            // ("#current-time").text(date);
            // console.log(date);
            console.log(data.name);
            featuredWeather.append(cityName);
            
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
            
        })
        localStorage.setItem("cityInput", cityInput);
       

// function renderWeather() {
//     // console.log(weather);
   
  
    
// }
// renderWeather();
}) 

//function for 5 day forecast
//new api url to be called 




