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

// GET USER'S COORDINATES
function getPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  getData(latitude, longitude);
}
  
// FETCH API DATA & ASSIGN TO WEATHER OBJECT
function getData(latitude, longitude) {
  // API outputs metric units - no Kelvin conversion required
  const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  fetch(api)
    .then((response) => {
      const data = response.json();
      return data;
    })  
    .then((data) => {
      weather.temperature.value = Math.floor(data.main.temp);
      weather.iconId = data.weather[0].icon;
      weather.description = data.weather[0].description;
      weather.city = data.name;
      weather.country = data.sys.country;

      displayWeather();
    })
}

// DISPLAY WEATHER DATA IN HTML
function displayWeather() {
  // 'iconFolder' is declared in dark-mode.js
  iconElement.innerHTML = `<img src="${iconFolder}/${weather.iconId}.png" alt="#">`;
  temperatureElement.innerHTML = `${weather.temperature.value}&deg<span>C</span>`;
  descriptionElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// CELSIUS TO FAHRENHEIT CONVERSION
const celsiusToFahrenheit = (celsius) => {
  const fahrenheit = (celsius * 9/5) + 32;
  return fahrenheit;
}

// CONVERT C TO F ON CLICK
temperatureElement.addEventListener('click', () => {
  if (weather.temperature.value == undefined)
    return;

  if (weather.temperature.unit == 'celsius') {
    weather.temperature.unit = 'fahrenheit';
    const fahrenheit = Math.floor(celsiusToFahrenheit(weather.temperature.value));
    temperatureElement.innerHTML = `${fahrenheit}&deg<span>F</span>`;
  } else {
    weather.temperature.unit = 'celsius';
    temperatureElement.innerHTML = `${weather.temperature.value}&deg<span>C</span>`;
  }
})