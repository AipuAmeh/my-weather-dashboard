var apiKey = "485d8029f9463fb9427a7793559846d9";


var search = document.getElementById("search");
var date = new Date().toLocaleDateString();


function searchWeather(city) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial" +
    "&appid=" +
    apiKey;
  fetch(queryURL, { method: "GET" })
    .then(function (response) {
   
      return response.json();
    })
    .then(function (data) {
      makeMainCard(data);
    });
}


search.addEventListener("click", function (event) {
  event.preventDefault();
  var cityInput = document.getElementById("user-input").value;
  if (cityInput === "") {
    alert("Please enter a city name");
    return;
  }
  searchWeather(cityInput);
  fiveDayForecast(cityInput)
});

function makeMainCard(data) {
 
  var featuredWeather = document.querySelector(".weather-features");
  featuredWeather.innerHTML = "";
  featuredWeather.setAttribute("id", "weather-box");
  var cityName = document.createElement("h2");
  cityName.setAttribute("id", "city-name");
 
  cityName.textContent = data.name;

  featuredWeather.append(cityName);
  var iconImage = document.createElement("img");
  iconImage.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
  featuredWeather.append(iconImage);
  
  featuredWeather.append(cityName);
  cityName.append(" " + date + " ");
 

var weatherDetails = document.createElement("ul");
weatherDetails.setAttribute("id", "weather-details")
  weatherDetails.innerHTML = "";
  var temp = document.createElement("li");
  temp.textContent = "Temp: " + data.main.temp + " \xB0" + "F";
  weatherDetails.append(temp);
  featuredWeather.append(weatherDetails);

  var humidity = document.createElement("li");
  humidity.textContent = "Humidity: " + data.main.humidity + " %";
  weatherDetails.append(humidity);
  featuredWeather.append(weatherDetails);

  var wind = document.createElement("li");
  wind.textContent = "Wind: " + data.wind.speed + " MPH";
  weatherDetails.append(wind);
  featuredWeather.append(weatherDetails);

  saveToStorage(data.name);
}

function saveToStorage(newCity) {

  var history = JSON.parse(localStorage.getItem("cityInput"));
  if(history.includes(newCity)){
    return
  }
  history.push(newCity);
  localStorage.setItem("cityInput", JSON.stringify(history));
}

function loadStorage() {

  var history = JSON.parse(localStorage.getItem("cityInput"));
 
  if (!history) {
    localStorage.setItem("cityInput", JSON.stringify([]));
    return;
  }
  if (!history.length) {
    return;
  }

  var historyContainer = document.getElementById("history");
  historyContainer.innerHTML = "";
  for (let i = 0; i < history.length; i++) {
  
    var historyButton = document.createElement("button");
    historyButton.setAttribute("id", "history-button");
    historyButton.innerHTML = history[i];
    historyButton.addEventListener("click", function (event) {
      searchWeather(event.target.innerHTML);
      fiveDayForecast(event.target.innerHTML)
    });
    historyContainer.append(historyButton);
  }
}

function fiveDayForecast(city) {
  var forecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial" + 
    "&appid=" +
    apiKey;

  fetch(forecastURL, { method: "GET" })
    .then(function (forecast) {
   
      return forecast.json();
    })
  
    .then(function (forecastData) {
      var dailyForecast = forecastData.list;
      renderForecast(dailyForecast);
    });

  function renderForecast(dailyForecast) {
  
    var newSection = document.createElement("h2");
    newSection.setAttribute("id", "five-day-title");
    var weatherForecast = document.querySelector("#weather-forecast");
    weatherForecast.innerHTML = "";
    var title = "Five Day Forecast: ";
    newSection.append(title);
    weatherForecast.append(newSection);

    for (var i = 0; i < dailyForecast.length; i += 8) {
        console.log(dailyForecast[i]);

        var weatherContainer = document.createElement("div");
        weatherContainer.setAttribute("class", "each-container")
            var newDate = dailyForecast[i].dt_txt;
           
            var iconImage = document.createElement("img")
            iconImage.setAttribute("src","https://openweathermap.org/img/wn/" + dailyForecast[i].weather[0].icon + "@2x.png")
            weatherContainer.append(iconImage);
            weatherContainer.append(dayjs(newDate).format("MM/DD/YYYY"));
            
            
            weatherForecast.append(weatherContainer);

        var dailyFeatures = document.createElement("ul");

            var newTemp = document.createElement("li");
            newTemp.textContent = "Temp: " + dailyForecast[i].main.temp + " \xB0" + "F";
            dailyFeatures.append(newTemp);
            weatherContainer.append(dailyFeatures);
            weatherForecast.append(weatherContainer);
            
            var newWind = document.createElement("li");
            newWind.textContent = "Wind: " + dailyForecast[i].wind.speed + " MPH";
            dailyFeatures.append(newWind);
            weatherContainer.append(dailyFeatures);
            weatherForecast.append(weatherContainer);

            var newHumidity = document.createElement("li");
            newHumidity.textContent = "Humidity: " + dailyForecast[i].main.humidity + " %";
            dailyFeatures.append(newHumidity);
            weatherContainer.append(dailyFeatures);
            weatherForecast.append(weatherContainer);

           
    }
  
    
  }
}

loadStorage();
