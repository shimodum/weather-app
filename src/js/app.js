import { fetchWeatherByCity } from './weatherApi.js';
import { showWeather, showError, showLoading } from './ui.js';

const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const cityName = cityInput.value.trim();

  if (!cityName) {
    showError('都市名を入力してください。');
    return;
  }

  try {
    showLoading();
    const weatherData = await fetchWeatherByCity(cityName);
    showWeather(weatherData);
  } catch (error) {
    showError(error.message);
  }
});