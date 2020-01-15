// GLOBAL VARIABLES
const modeButton = document.getElementById('mode-btn');
const bodyElement = document.querySelector('body');
const containerElement = document.querySelector('.container');

let darkModeActive = false;

// TOGGLE DARK MODE ON BUTTON CLICK
modeButton.addEventListener('click', () => {
  if (darkModeActive == false) {
    // Set icons to white
    if (weather.iconId == undefined)
      iconElement.innerHTML = `<img src="icons/white/unknown.png" alt="#">`;
    else
      iconElement.innerHTML = `<img src="icons/white/${weather.iconId}.png" alt="#">`;
    // Invert colours & update btn text
    bodyElement.style.color = '#f9f9f9';
    containerElement.style.backgroundColor = '#131313';
    modeButton.innerHTML = 'Light Mode';

    darkModeActive = true;
  }
  else {
    // Set icons to black
    if (weather.iconId == undefined)
      iconElement.innerHTML = `<img src="icons/black/unknown.png" alt="#">`;
    else
      iconElement.innerHTML = `<img src="icons/black/${weather.iconId}.png" alt="#">`;
    // Invert colours & update btn text
    bodyElement.style.color = '#0F0F0F';
    containerElement.style.backgroundColor = '#f9f9f9';
    modeButton.innerHTML = 'Dark Mode';

    darkModeActive = false;
  }
});