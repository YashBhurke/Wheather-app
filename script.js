// WEATHER FETCH FUNCTION
async function getWeather() {
  const apiKey = "f2113a834f864e7abc533805253006"; // your WeatherAPI key
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerText = "Please enter a city name.";
    return;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      resultDiv.innerText = "City not found!";
      return;
    }

    resultDiv.innerHTML = `
      <p><strong>${data.location.name}, ${data.location.country}</strong></p>
      <p>${data.current.condition.text}</p>
      <img src="https:${data.current.condition.icon}" alt="Weather icon" class="weather-icon">
      <p>${data.current.temp_c} °C</p>
    `;

    // Update background based on weather (only if NOT in dark mode)
    const condition = data.current.condition.text.toLowerCase();
    const body = document.body;

    if (!body.classList.contains("dark")) {
      if (condition.includes("rain")) {
        body.style.background = "linear-gradient(135deg, #3a7bd5, #3a6073)";
      } else if (condition.includes("clear") || condition.includes("sunny")) {
        body.style.background = "linear-gradient(135deg, #f6d365, #fda085)";
      } else if (condition.includes("cloud")) {
        body.style.background = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
      } else if (condition.includes("snow")) {
        body.style.background = "linear-gradient(135deg, #83a4d4, #b6fbff)";
      } else if (condition.includes("mist") || condition.includes("fog")) {
        body.style.background = "linear-gradient(135deg, #606c88, #3f4c6b)";
      } else {
        body.style.background = "linear-gradient(135deg, #74ebd5, #acb6e5)";
      }
    }

  } catch (error) {
    resultDiv.innerText = "Error fetching weather data.";
  }
}

// DARK/LIGHT MODE TOGGLE
const modeSwitch = document.getElementById("modeSwitch");
const modeLabel = document.getElementById("modeLabel");
const container = document.querySelector(".weather-container");

modeSwitch.addEventListener("change", () => {
  const body = document.body;

  if (modeSwitch.checked) {
    // Dark mode ON
    body.classList.add("dark");
    container.classList.add("dark-mode");
    modeLabel.textContent = "Dark Mode";
    body.style.background = "linear-gradient(135deg, #232526, #414345)";
  } else {
    // Light mode ON
    body.classList.remove("dark");
    container.classList.remove("dark-mode");
    modeLabel.textContent = "Light Mode";
    body.style.background = "linear-gradient(135deg, #74ebd5, #acb6e5)";
  }
});
