let currentTime = new Date();
let time = document.querySelector("#time");

let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];

time.innerHTML = `${day} ${hours}:${minutes}`;

function updateTemperature(response) {
  let temperature = document.querySelector("#temperature");
  let temperatureRound = Math.round(response.data.main.temp);
  temperature.innerHTML = `${temperatureRound}°F`;
  let changeCity = document.querySelector("#city-searched");
  changeCity.innerHTML = response.data.name;
}

function searchedCity(event) {
  event.preventDefault();
  let city = document.querySelector("#magnified");
  let apiKey = "6d859add0b9e65ca86d1bc6fb5d40644";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateTemperature);
}

let submitSearchForm = document.querySelector("#search-form");
submitSearchForm.addEventListener("submit", searchedCity);

function currentInfo(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = `${temperature}°F`;

  document.querySelector("#city-searched").innerHTML = response.data.name;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(
    "#wind"
  ).innerHTML = `Wind Speed: ${response.data.main.speed} mph`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "6d859add0b9e65ca86d1bc6fb5d40644";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(currentInfo);
  console.log(position.coords);
}

function currentLocationWeather() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-weather");
button.addEventListener("click", currentLocationWeather);
