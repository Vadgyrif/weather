"use strict"



console.log('Hello fucking world.');

const weatherBlock = document.querySelector('.weather_today');
const loadWeatherBtn = document.getElementById('loadWeatherBtn');

async function loadWeather() {
    const cityInput = document.getElementById("cityInput");
    const city = cityInput.value.trim() || 'Lutsk'; 

    weatherBlock.innerHTML = `
    <div class="weather__loading">
        <img src="modules/custom/weather/image/74H8.gif" alt="loading....">
    </div>`;



    let weatherApiKey = drupalSettings.weatherApiKey;
    console.log(weatherApiKey);
    const server = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=` + weatherApiKey;


    console.log(server);

    try {
        const response = await fetch(server, {
            method: 'GET',
        });
        const responseResult = await response.json();

        if (response.ok) {
            getWeather(responseResult);
        } else {
            weatherBlock.innerHTML = responseResult.message;
        }
    } catch (error) {
        weatherBlock.innerHTML = 'Помилка при отриманні даних про погоду';
        console.error(error);
    }
}

function getWeather(data) {
    console.log(data);

    const location = data.name;
    const temp = Math.round(data.main.temp);
    const feelslike = Math.round(data.main.feels_like);
    const weatherStatus = data.weather[0].main;
    const windSpeed = data.wind.speed; 
    const windDeg = data.wind.deg; 
    const humidity = data.main.humidity;

    const windDirection = getWindDirection(windDeg);

    function getWindDirection(deg) {
        if (deg > 337.5) return 'Північний';
        if (deg > 292.5) return 'Північно-західний';
        if (deg > 247.5) return 'Західний';
        if (deg > 202.5) return 'Південно-західний';
        if (deg > 157.5) return 'Південний';
        if (deg > 122.5) return 'Південно-східний';
        if (deg > 67.5) return 'Східний';
        if (deg > 22.5) return 'Північно-східний';
        return 'Північний';
    }


    const weatherIcons = {
        'Clear': 'modules/custom/weather/image/sunny.png',
        'Clouds': 'modules/custom/weather/image/clouds.png',
        'Rain': 'modules/custom/weather/image/rainy.png',
        'Snow': 'modules/custom/weather/image/snowy.png',
        'Drizzle': 'modules/custom/weather/image/drizzle.png',
        'Thunderstorm': 'modules/custom/weather/image/thunderstorm.png',
        'Mist': 'modules/custom/weather/image/mist.png',

    };

    const weatherIcon = weatherIcons[weatherStatus] || 'modules/custom/weather/image/default.png';

    const templates = ` 
    <div class="weather_details">
    </div>
    <div class="weather_icon">
        <img src="${weatherIcon}" alt="${weatherStatus}" class="weather__icon">
    </div>
    <h2 class="weather_city"> ${location} </h2>
    <div class="weather_temp"> ${temp}°C</div>
    <div class="weather_feels-like"> Відчувається як: ${feelslike}°C </div>
    <div class="weather__second_section">
        <div class="weather__huminidy">
            <img src="modules/custom/weather/image/huminidy.png" class="weather__humidity_img"></img>
            <div class="weather_humidity_text"> ${humidity} %</div>
        </div>
        <div class="weather__wind">
            <img src="modules/custom/weather/image/wind.png" class="weather__wind_img"></img>
            <div class="weather_wind_text">  ${windSpeed} м/с, ${windDirection}</div>
        </div>
    </div>`;

    weatherBlock.innerHTML = templates;
}


if (weatherBlock && loadWeatherBtn) {
    loadWeatherBtn.addEventListener('click', loadWeather);
}
