var apiKey = "485d8029f9463fb9427a7793559846d9";
//user input concatenated into a string

var search = document.getElementById("search");
var date = new Date().toLocaleDateString();
console.log(date);
//render weather data at top of page
//history list that saves to side of page
function searchWeather(city) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial" +
    "&appid=" +
    apiKey;
  fetch(queryURL, { method: "GET" })
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      makeMainCard(data);
    });
}

//when you click search the city is stored
//displaying city info based off user input
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
  //empty out the main Card
  var featuredWeather = document.querySelector(".weather-features");

  var cityName = document.querySelector("#city-name");
  cityName.textContent = data.name;
  // var icon = data.weather[0].icon;
  console.log(data);
  featuredWeather.append(cityName);
  cityName.append(" " + date + " ");
  var icon = document.getElementById("icon").src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
  console.log(icon);


  var weatherDetails = document.querySelector("#weather-details");
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
  console.log("city to be saving")
  console.log(data.name)
  saveToStorage(data.name);
}

function saveToStorage(newCity) {
  //add it to my storage
  console.log("in my save to storage saving my : ", newCity);
  var history = JSON.parse(localStorage.getItem("cityInput"));
  if(history.includes(newCity)){
    return
  }
  history.push(newCity);
  localStorage.setItem("cityInput", JSON.stringify(history));
}

function loadStorage() {
  console.log("loading my storage");
  var history = JSON.parse(localStorage.getItem("cityInput"));
  console.log(history);
  if (!history) {
    localStorage.setItem("cityInput", JSON.stringify([]));
    return;
  }
  if (!history.length) {
    return;
  }
  //where do I want my content to go
  var historyContainer = document.getElementById("history");
  historyContainer.innerHTML = "";
  for (let i = 0; i < history.length; i++) {
    //make a button
    var historyButton = document.createElement("button");
    historyButton.innerHTML = history[i];
    historyButton.addEventListener("click", function (event) {
      searchWeather(event.target.innerHTML);
      fiveDayForecast(event.target.innerHTML)
    });
    historyContainer.append(historyButton);
  }
}
//function for 5 day forecast
//new api url to be called
function fiveDayForecast(city) {
  var forecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial" + 
    "&appid=" +
    apiKey;

  fetch(forecastURL, { method: "GET" })
    .then(function (forecast) {
      console.log(forecast);
      return forecast.json();
    })
    //get list of days as an array, features are objects
    .then(function (forecastData) {
      var dailyForecast = forecastData.list;
      renderForecast(dailyForecast);
    });

  function renderForecast(dailyForecast) {
    console.log("in my render forecast");
    console.log(dailyForecast);



    //where to append it to need date, icon, temp, wind, and humidity
    //create what I want to ceate
    //append it to the target element at the end
    
   
    var newSection = document.createElement("h2");
    var weatherForecast = document.querySelector("#weather-forecast");
    var title = "Five Day Forecast: ";
    newSection.append(title);
    weatherForecast.append(newSection);

    for (var i = 0; i < dailyForecast.length; i += 8) {
        console.log(dailyForecast[i]);

        var weatherContainer = document.createElement("div");
            var newDate = dailyForecast[i].dt_txt;
                weatherContainer.append(dayjs(newDate).format("MM/DD/YYYY"));
        
            // var icons = document.getElementById("forecast-icons").src = "https://openweathermap.org/img/wn/" + dailyForecast[i].weather[0].icon + "@2x.png";
            // console.log(dailyForecast[i].weather[0].icon);
            // weatherContainer.append(icons);
            // weatherForecast.append(weatherContainer);
//icons and styling
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

            //how to show icons
    }
  
    
  }
}

loadStorage();
