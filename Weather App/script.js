const apiKey = "9902fee0d8ac68f13b8cb56e19616bbf";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Unsplash API for images
const unsplashApiUrl = "https://api.unsplash.com/search/photos";
const unsplashApiKey = "j2JC5zj48M1qSIzWIOZM6IV-Gcpl6yPgF77Wn0TR8Iw";

// Access Key : j2JC5zj48M1qSIzWIOZM6IV-Gcpl6yPgF77Wn0TR8Iw
// Secret key : ssRBiCT-Q-Q19_Lmho6-LmvhhKsgSf4ONw5BSjFRJpU


const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function fetchBackgroundImage(weatherCondition) {
    try {
        const response = await fetch(`${unsplashApiUrl}?query=${weatherCondition}&client_id=${unsplashApiKey}`);
        const data = await response.json();

        if (data.results.length > 0) {
            const imageUrl = data.results[0].urls.full;
            document.body.style.backgroundImage = `url('${imageUrl}')`;
        } else {
            console.error("No images found for the given weather condition.");
            document.body.style.backgroundImage = "url('images/default-bg.jpg')"; // Fallback
        }
    } catch (error) {
        console.error("Error fetching background image:", error);
        document.body.style.backgroundImage = "url('images/default-bg.jpg')"; // Fallback
    }
}

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            const data = await response.json();

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " kmph";

            const weatherCondition = data.weather[0].main.toLowerCase();

            if (weatherCondition === "clouds") {
                weatherIcon.src = "images/clouds.png";
            } else if (weatherCondition === "rain") {
                weatherIcon.src = "images/rain.png";
            } else if (weatherCondition === "drizzle") {
                weatherIcon.src = "images/drizzle.png";
            } else if (weatherCondition === "mist") {
                weatherIcon.src = "images/mist.png";
            } else if (weatherCondition === "clear") {
                weatherIcon.src = "images/clear.png";
            } else {
                weatherIcon.src = "images/default.png";
            }

            fetchBackgroundImage(weatherCondition);

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click", function () {
    checkWeather(searchBox.value);
});



