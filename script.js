const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const tempDisplay = document.getElementById('temp');
const weatherDisplay = document.getElementById('weather');
const errorMsg = document.getElementById('error-msg');
const weatherIcon = document.getElementById('weather-icon');
const apiKey = "your_api_key";

searchBtn.addEventListener('click', () => handleSearch());

cityInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') handleSearch();
});

async function handleSearch() {
    const cityName = cityInput.value.trim();
    if (!cityName) return;

        try {
            const weatherData = await fetchWeatherData(cityName);
            displayWeatherData(weatherData);
        } catch (error) {
            displayError()
            console.error(`Error fetching weather data: ${error}`);
        }
}

async function fetchWeatherData(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) return;

    return await response.json();
}

function displayWeatherData(data) {
    const weatherDescription = capitalize(data.weather[0]?.description || 'No description');
    const weatherIconUrl = `https://openweathermap.org/img/wn/${data.weather[0]?.icon || '01d'}@4x.png`;

    tempDisplay.textContent = `Temperature: ${data.main?.temp ?? 'N/A'}°C`;
    weatherDisplay.textContent = `Weather: ${weatherDescription}`;

    weatherIcon.src = weatherIconUrl;
    weatherIcon.alt = `Weather showing ${weatherDescription}`;

    toggleVisibility(true);
}

function capitalize(str) {
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function displayError() {
    toggleVisibility(false);
}

function toggleVisibility(isVisible) {
    const elements = [tempDisplay, weatherDisplay, weatherIcon];
    elements.forEach(el => 
        // If true, the class will be added to the element
        el.classList.toggle('hidden', !isVisible)
    );
    errorMsg.classList.toggle('hidden', isVisible);
}

