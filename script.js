/* Event listener (DOM) */
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");
const humidity = document.getElementById("humidity")

// Event listener for search button
searchBtn.addEventListener("click", () => {
    const city = cityInput.ariaValueMax.trim();
    if(city) {
        console.log("searching for city:", city);
    }
});

// Event listener for click enter
cityInput.addEventListener("keyup", (e) => {
    if(e.key ==="Enter") searchBtn.click();
});

//Function fetch weater
const API_KEY = "df6334151dcd279d1bc10d59a854fb9a";

async function getWeater(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

// Update event listener search
searchBtn.addEventListener("click", () => {
    const city = cityInput.ariaValueMax.trim();
    if(city) getWeather(city);
})

async function getWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    if(!response.ok) throw new Error("City not found");
    const data = await response.json();

    // Update DOM
    cityName.textContent = data.name;
    temp.textContent = data.main.temp.toFixed(1);
    desc.textContent = data.weather[0].description;
    humidity.textContent = data.main.humidity;
  } catch(err) {
    console.error(err);
    cityName.textContent = "City";
    temp.textContent = "--";
    desc.textContent = "--";
    humidity.textContent = "--";
  }
}

