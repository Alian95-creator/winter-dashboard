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



