// GLOBAL VARIABLES
const notificationElement = document.getElementById('notification');
const iconElement = document.getElementById('icon');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const locationElement = document.getElementById('location');

const apiKey = '4dac283c5c68fb0e9546999d2a6c29e6';

// APP DATA
const weather = {};

weather.temperature = {
  unit : 'celsius'
}

// CHECK GEOLOCATION IS AVAILABLE
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(getPosition, getError);
else {
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = 'Geolocation not supported';
}

// IF GEOLOCATION RETURNS AN ERROR
function getError(error) {
  notificationElement.style.display = 'block';
  notificationElement.innerHTML = error.message;
}

// GET COORDINATES - FETCH API DATA - INPUT INTO WEATHER OBJECT
function getPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  
  // API provides units in celsius so no kelvin conversion required
  const api = `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  fetch(api).then((response) => {
    response.json().then((parsedJson) => {
      weather.temperature.value = parsedJson.main.temp;
      weather.iconId = parsedJson.weather[0].icon;
      weather.description = parsedJson.weather[0].description;
      weather.city = parsedJson.name;
      weather.country = parsedJson.sys.country;

      assignWeather();
    })
  })
}

// ASSIGN WEATHER OBJECT DATA TO HTML
function assignWeather() {
  // 'iconFolder' is declared in dark-mode.js
  iconElement.innerHTML = `<img src="${iconFolder}/${weather.iconId}.png" alt="#">`;
  temperatureElement.innerHTML = `${weather.temperature.value}&deg<span>C</span>`;
  descriptionElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}