import {
  fetchWeatherByCity,
  fetchWeatherByLocation
} from './weatherApi.js';
import { showWeather, showError, showLoading } from './ui.js';

const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const historyList = document.getElementById('historyList');

let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

renderHistory();

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const cityName = cityInput.value.trim();

  if (!cityName) {
    showError('都市名を入力してください。');
    return;
  }

  await searchWeather(cityName);
});

async function searchWeather(cityName) {
  try {
    showLoading();

    const weatherData = await fetchWeatherByCity(cityName);

    showWeather(weatherData);
    addHistory(weatherData.name);
  } catch (error) {
    showError(error.message);
  }
}

function addHistory(cityName) {
  searchHistory = searchHistory.filter((city) => city !== cityName);
  searchHistory.unshift(cityName);
  searchHistory = searchHistory.slice(0, 5);

  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = '';

  searchHistory.forEach((cityName) => {
    const li = document.createElement('li');
    li.textContent = cityName;

    li.addEventListener('click', () => {
      cityInput.value = cityName;
      searchWeather(cityName);
    });

    historyList.appendChild(li);
  });
}

const currentLocationBtn = document.getElementById('currentLocationBtn');

currentLocationBtn.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        showLoading();

        const weatherData = await fetchWeatherByLocation(
          position.coords.latitude,
          position.coords.longitude
        );

        showWeather(weatherData);
        
      } catch (error) {
        showError(error.message);
      }
    },
    () => {
      showError('位置情報取得が許可されませんでした');
    }
  );
});