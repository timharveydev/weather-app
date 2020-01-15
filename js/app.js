// GLOBAL VARIABLES
const notificationElement = document.getElementById('notification');
const iconElement = document.getElementById('icon');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const locationElement = document.getElementById('location');

// APP DATA
const weather = {};

weather.temperature = {
  unit : 'celsius'
}

// CHECK GEOLOCATION IS AVAILABLE
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(getData, showError);
else {
  notificationElement.style.display = 'block';
  notificationElement.innerHTML = 'Geolocation not supported';
}

// IF GEOLOCATION RETURNS AN ERROR
function showError(error) {
  notificationElement.style.display = 'block';
  notificationElement.innerHTML = error.message;
}
  
// FETCH API DATA WITH USER'S COORDINATES & ASSIGN DATA TO WEATHER OBJECT
function getData(currentPosition) {
  // API outputs metric units - no Kelvin conversion required
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${currentPosition.coords.latitude}&lon=${currentPosition.coords.longitude}&units=metric&appid=4dac283c5c68fb0e9546999d2a6c29e6`;

  fetch(api)
    .then((response) => {
      return response.json();
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
  iconElement.innerHTML = `<img src="icons/black/${weather.iconId}.png" alt="#">`;
  temperatureElement.innerHTML = `${weather.temperature.value}&deg<span>C</span>`;
  descriptionElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// CELSIUS TO FAHRENHEIT CONVERSION
const celsiusToFahrenheit = (celsius) => {
  return (celsius * 9/5) + 32;
}

// CONVERT C TO F ON CLICK
temperatureElement.addEventListener('click', () => {
  if (weather.temperature.value == undefined)
    return;

  if (weather.temperature.unit == 'celsius') {
    weather.temperature.unit = 'fahrenheit';
    const fahrenheit = Math.floor(celsiusToFahrenheit(weather.temperature.value));
    temperatureElement.innerHTML = `${fahrenheit}&deg<span>F</span>`;
  }
  else {
    weather.temperature.unit = 'celsius';
    temperatureElement.innerHTML = `${weather.temperature.value}&deg<span>C</span>`;
  }
});