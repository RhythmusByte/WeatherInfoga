// Selecting form, city input, and card elements
const form = document.querySelector('.form');
const cityInput = document.getElementById('city');
const card = document.querySelector('.card');

// OpenWeatherMap API key
const apiKey = "a44475fa2f02a503bc6e835ba3e6c751";

// Event listener for form submission
form.addEventListener("submit", async event => {
  event.preventDefault();

  // Get the value of the city input
  const city = cityInput.value;
  // Check if a city is entered
  if(city){
    try {
      // Get weather data for the entered city
      const weatherData = await getWeatherData(city);
      // Display weather details
      displayDetails(weatherData);
    }
    catch(error) {
      // Log and display error messages
      console.error(error);
      errorDisplay(error);
    }
  }
  else {
    // Display error message if no city is entered
    errorDisplay("Please Enter a Proper City Name");
  }
});

// Function to fetch weather data from OpenWeatherMap API
async function getWeatherData(city) {
  const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(apiurl);
  if(!response.ok) {
    throw new Error('Please Enter a Valid city Name');
  }

  return await response.json();
}

// Function to display weather details on the card
function displayDetails(data) {
  // Destructure relevant weather data from the response
  const {name: city,
    main: {temp, humidity, feels_like, temp_max, temp_min},
    weather: [{description, id}]} = data;

    // Clear previous content and set card display to flex
    card.textContent = '';
    card.style.display = 'flex';

    // Create elements for displaying weather details
    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');
    const feelsDisplay = document.createElement('p');
    const minDisplay = document.createElement('p');
    const maxDisplay = document.createElement('p');
    const descDisplay = document.createElement('p');
    const emojiDisplay = document.createElement('p');

    // Add classes to created elements
    cityDisplay.classList.add('cityDisplay');
    tempDisplay.classList.add('tempDisplay');
    humidityDisplay.classList.add('humidityDisplay');
    feelsDisplay.classList.add('feelsDisplay');
    minDisplay.classList.add('min');
    maxDisplay.classList.add('max');
    descDisplay.classList.add('descDisplay');
    emojiDisplay.classList.add('emojiDisplay');

    // Set text content for each element
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp).toFixed(1)}° C`;
    humidityDisplay.textContent = `Humidity: ${humidity}`;
    feelsDisplay.textContent = `Feels Like: ${feels_like}`
    minDisplay.textContent = `Min: ${(temp_min).toFixed(1)}° C`
    maxDisplay.textContent = `Max: ${(temp_max).toFixed(1)}° C`
    feelsDisplay.textContent = `Feels Like ${feels_like}`
    descDisplay.textContent = `${description}`.toUpperCase();
    emojiDisplay.textContent = displayEmoji(id);

    // Append elements to the card
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(feelsDisplay);
    card.appendChild(minDisplay);
    card.appendChild(maxDisplay);
    card.appendChild(descDisplay);
    card.appendChild(emojiDisplay);
}

// Function to display emoji based on weather condition
function displayEmoji(id) {
  switch(true) {
    case (id >= 200 && id < 300):
      return "⛈️";
    case (id >= 300 && id < 400):
      return "🌧️";
    case (id >= 500 && id < 600):
      return "🌧️";
    case (id >= 600 && id < 700):
      return "❄️";
    case (id >= 700 && id < 800):
      return "🌫️";
    case (id === 800):
      return "🌞";
    case (id > 800 && id < 810):
      return "🌥️";
    default:
      return "🌇"
  }
}

// Function to display error messages
function errorDisplay(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add('errorDisplay');

  // Clear previous content and set card display to flex
  card.textContent = "";
  card.style.display = "flex";

  // Append error message to the card
  card.appendChild(errorDisplay);
}
