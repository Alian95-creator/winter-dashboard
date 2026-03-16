/* DOM Elements */
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");
const humidity = document.getElementById("humidity");

const API_KEY = "df6334151dcd279d1bc10d59a854fb9a";


/* SEARCH BUTTON */
searchBtn.addEventListener("click", () => {

  const city = cityInput.value.trim();

  if (city !== "") {
    getWeather(city);
  }

});


/* ENTER KEY SEARCH */
cityInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") searchBtn.click();
});


/* FETCH WEATHER BY CITY */
async function getWeather(city) {
  try {

    spinner.style.display = "block";
    weatherCard.style.opacity = 0.5;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    cityName.textContent = data.name;
    temp.textContent = data.main.temp.toFixed(1);
    desc.textContent = data.weather[0].description;
    humidity.textContent = data.main.humidity;

    spinner.style.display = "none";
    weatherCard.style.opacity = 1;

  } catch (err) {

    spinner.style.display = "none";
    weatherCard.style.opacity = 1;

    alert(err.message);

    cityName.textContent = "City";
    temp.textContent = "--";
    desc.textContent = "--";
    humidity.textContent = "--";
  }
}


/* WEATHER BY GPS LOCATION */
function getWeatherByLocation(lat, lon) {

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {

      cityName.textContent = data.name;
      temp.textContent = data.main.temp.toFixed(1);
      desc.textContent = data.weather[0].description;
      humidity.textContent = data.main.humidity;

    })
    .catch(err => console.error(err));
}


/* LOADING SPINNER */
const weatherCard = document.querySelector(".weather-card");

const spinner = document.createElement("div");

spinner.className = "spinner";

spinner.innerHTML = `
<div class="double-bounce1"></div>
<div class="double-bounce2"></div>
`;

weatherCard.appendChild(spinner);


/* SNOW ANIMATION */
function createSnowflake() {

  const snowflake = document.createElement("div");

  snowflake.classList.add("snowflake");

  snowflake.style.left = Math.random() * window.innerWidth + "px";

  snowflake.style.animationDuration = 3 + Math.random() * 5 + "s";

  snowflake.style.opacity = Math.random();

  snowflake.style.fontSize = 10 + Math.random() * 20 + "px";

  snowflake.textContent = "❄️";

  document.body.appendChild(snowflake);

  setTimeout(() => snowflake.remove(), 8000);

}

setInterval(createSnowflake, 200);


/* AUTO DETECT LOCATION */
if (navigator.geolocation) {

  navigator.geolocation.getCurrentPosition(

    (position) => {

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      getWeatherByLocation(lat, lon);

    },

    () => {

      console.log("Location access denied");

      getWeather("Jakarta");

    }

  );

} else {

  getWeather("Jakarta");

}