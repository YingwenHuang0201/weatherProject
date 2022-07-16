// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80,
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50,
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20,
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100,
//   },
//   oslo: {
//     temp: -5,
//     humidity: 20,
//   },
//   sydney: {
//     temp: 10,
//     humidity: 20,
//   },
// };

// function searchCityWeather() {
//   let city = prompt("Enter a city");
//   city = city.toLowerCase().trim();

//   if (weather[city] !== undefined) {
//     let temperature = weather[city].temp;
//     let Ctemp = Math.round(temperature);
//     let Ftemp = Math.round(Ctemp * 1.8 + 32);
//     let cityHumidity = weather[city].humidity;
//     alert(
//       `It is currently ${Ctemp}°C (${Ftemp}°F) in ${city} with a humidity of ${cityHumidity}%`
//     );
//   } else {
//     alert(
//       `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
//     );
//   }
// }

//PlusWeek4

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

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", searchCityWeather);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

//默认地点天气
getWeatherData("Tokyo");
