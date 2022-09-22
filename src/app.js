function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `  
    <div class="col-2">
      <div class="weather-forecast-date">${day}</div>
      <img
        src="http://openweathermap.org/img/wn/04d@2x.png"
        alt=""
        width="30"
      />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-max">18°</span>
        <span class="weather-forecast-min">10°</span>
      </div>
    </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "4d6942c0f6f8b66b251e082acf3b3d83";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&
  units=metric`;
}

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let temperature = document.querySelector("#currentTemp");
  temperature.innerHTML = Math.round(celsiusTemperature);
  let city = document.querySelector("#currentCity");
  city.innerHTML = response.data.name;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#speed");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function search(city) {
  let apiKey = "4d6942c0f6f8b66b251e082acf3b3d83";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function FahrenheitConversion(event) {
  event.preventDefault();
  let temperature = document.querySelector("#currentTemp");
  let fahrenheit = celsiusTemperature * 1.8 + 32;
  temperature.innerHTML = Math.round(fahrenheit);
}

function celsiusConversion(event) {
  event.preventDefault();
  let temperature = document.querySelector("#currentTemp");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let convertFahrenheit = document.querySelector("#convert-fahrenheit");
convertFahrenheit.addEventListener("click", FahrenheitConversion);

let convertCelsius = document.querySelector("#convert-celsius");
convertCelsius.addEventListener("click", celsiusConversion);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("The Hague");
displayForecast();
