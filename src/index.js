function formatDate(date) {
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
  let day = days[now.getDay()];

  return `${day} ${hours}:${minutes}`;
}

let currentDayAndTime = document.querySelector("#dayAndTime");
let now = new Date();
currentDayAndTime.innerHTML = formatDate(now);

//搜索引擎实时城市天气信息API/当地城市天气信息

let apiKey = "efb258538681079ba3b62972e9a1386b";

//下排天气预报的时间戳
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

//下排天气预报
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <div class="col">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@4x.png" alt=""width="50"/>
          <div class="weater-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${Math.round(
            forecastDay.temp.max
          )}°</span> 
          <span class="weather-forecast-temperature-min">${Math.round(
            forecastDay.temp.min
          )}°</span>
        </div>
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showCityWeather(response) {
  let tem = Math.round(response.data.main.temp);
  let h2tem = document.querySelector("#currentTem");
  h2tem.innerHTML = `${tem}`;
  let name = document.querySelector("#bigCityname");
  name.innerHTML = response.data.name;
  let description = document.querySelector("#weatherDes");
  description.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector("#humidityW");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#windS");
  wind.innerHTML = response.data.wind.speed;
  let bigIcon = document.querySelector("#bigicon");
  bigIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`
  );

  getForecast(response.data.coord);
}

function getWeatherData(cityname) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityWeather);
}

function searchCityWeather(event) {
  event.preventDefault();
  let cityname = document.querySelector("#search-text-city").value;
  getWeatherData(cityname);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function tokyoCityWeather(event) {
  event.preventDefault();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityWeather);
}

function lisbonCityWeather(event) {
  event.preventDefault();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=lisbon&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityWeather);
}

function parisCityWeather(event) {
  event.preventDefault();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=paris&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityWeather);
}

function sydneyCityWeather(event) {
  event.preventDefault();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=sydney&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityWeather);
}

function sanfranciscoCityWeather(event) {
  event.preventDefault();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=san francisco&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityWeather);
}

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", searchCityWeather);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

//快捷地点天气
let tokyoWeather = document.querySelector("#tokyo");
tokyoWeather.addEventListener("click", tokyoCityWeather);
let lisbonWeather = document.querySelector("#lisbon");
lisbonWeather.addEventListener("click", lisbonCityWeather);
let parisWeather = document.querySelector("#paris");
parisWeather.addEventListener("click", parisCityWeather);
let sydneyWeather = document.querySelector("#sydney");
sydneyWeather.addEventListener("click", sydneyCityWeather);
let sanfranciscoWeather = document.querySelector("#sanfrancisco");
sanfranciscoWeather.addEventListener("click", sanfranciscoCityWeather);

//默认地点天气
getWeatherData("Tokyo");
