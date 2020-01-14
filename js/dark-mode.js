// GLOBAL VARIABLES
const modeButton = document.getElementById('mode-btn');
const bodyElement = document.querySelector('body');
const containerElement = document.querySelector('.container');

let darkModeActive = false;

// TOGGLE DARK MODE ON BUTTON CLICK
modeButton.addEventListener('click', () => {
  if (darkModeActive == false) {
    // Invert text and background colour
    bodyElement.style.color = '#f9f9f9';
    containerElement.style.backgroundColor = '#131313';
    // Update button text & set white icons
    modeButton.innerHTML = 'Light Mode';
    iconElement.innerHTML = `<img src="icons/white/${weather.iconId}.png" alt="#">`;

    darkModeActive = true;
  }
  else {
    // Invert text and background colour
    bodyElement.style.color = '#0F0F0F';
    containerElement.style.backgroundColor = '#f9f9f9';
    // Update button text & set black icons
    modeButton.innerHTML = 'Dark Mode';
    iconElement.innerHTML = `<img src="icons/black/${weather.iconId}.png" alt="#">`;

    darkModeActive = false;
  }
});