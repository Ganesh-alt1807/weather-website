const apiKey = "044d46a844284a16c90fb05b5d96a5c5";

const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherInfo = document.getElementById("weatherInfo");

//function to fetch weather data

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if(!response.ok) throw new Error("city not found");

    const data = await response.json();

    displayWeather(data);
  } catch (error) {
    weatherInfo.innerHTML = `<p>${error.message}</p>`;
  }
}

//function to display weather data

function displayWeather(data) {
  const { name } = data;
  const { temp, feels_like, temp_min, temp_max } = data.main; // Ensure feels_like is extracted here
  const { description, icon } = data.weather[0];

  weatherInfo.innerHTML = `
    <h2>${name}</h2>
    <p class="temp">${temp}°C</p>
    <p>Feels like: ${feels_like}°C</p>
    <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
    <p>Min: ${temp_min}°C / Max: ${temp_max}°C</p>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon">
  `;
}


// Event listener for the button

getWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if(city) {
    getWeather(city);
  } else {
    weatherInfo.innerHTML = "<p>Please enter a city name </p>";
  }
});