const form = document.querySelector('.form');
const cityInput = document.getElementById('city');
const card = document.querySelector('.card');
const apiKey = "a49b072fb4f49f7e4c27d85edf0bb9ff";

form.addEventListener("submit", async event => {
  event.preventDefault();

  const city = cityInput.value;
  if(city){
    try {
      const weatherData = await getWeatherData(city);
      displayDetails(weatherData);
    }
    catch(error) {
      console.error(error);
      errorDisplay(error);
    }
  }
  else {
    errorDisplay("Please Enter a Proper City Name");
  }
});

async function getWeatherData(city) {
  const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(apiurl);
  if(!response.ok) {
    throw new Error('Please Enter a Valid city Name');
  }

  return await response.json();
  }

function displayDetails(data) {
  console.log(data);
  const {name: city,
    main: {temp, humidity, feels_like, temp_max, temp_min},
    weather: [{description, id}]} = data;

    card.textContent = '';
    card.style.display = 'flex';

    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');
    const feelsDisplay = document.createElement('p');
    const minDisplay = document.createElement('p');
    const maxDisplay = document.createElement('p');
    const descDisplay = document.createElement('p');
    const emojiDisplay = document.createElement('p');


    cityDisplay.classList.add('cityDisplay');
    tempDisplay.classList.add('tempDisplay');
    humidityDisplay.classList.add('humidityDisplay');
    feelsDisplay.classList.add('feelsDisplay');
    minDisplay.classList.add('min');
    maxDisplay.classList.add('max');
    descDisplay.classList.add('descDisplay');
    emojiDisplay.classList.add('emojiDisplay');

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp).toFixed(1)}° C`;
    humidityDisplay.textContent = `Humidity: ${humidity}`;
    feelsDisplay.textContent = `Feels Like: ${feels_like}`
    minDisplay.textContent = `Min: ${(temp_min).toFixed(1)}° C`
    maxDisplay.textContent = `Max: ${(temp_max).toFixed(1)}° C`
    feelsDisplay.textContent = `Feels Like ${feels_like}`
    descDisplay.textContent = `${description}`.toUpperCase();
    emojiDisplay.textContent = displayEmoji(id);

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(feelsDisplay);
    card.appendChild(minDisplay);
    card.appendChild(maxDisplay);
    card.appendChild(descDisplay);
    card.appendChild(emojiDisplay);

}

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

function errorDisplay(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add('errorDisplay');

  card.textContent = "";
  card.style.display = "flex";

  card.appendChild(errorDisplay);
}