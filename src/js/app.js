import {
  fetchWeatherByCity,
  fetchWeatherByLocation,
  fetchForecastByCity,
  fetchForecastByLocation,
  fetchWeatherByZip,
  fetchForecastByZip
} from './weatherApi.js';

import {
  showWeather,
  showFavoriteButton,
  showForecast,
  showError,
  showLoading
} from './ui.js';

const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');

const historyList = document.getElementById('historyList');
const historySection = document.getElementById('historySection');

const favoriteList = document.getElementById('favoriteList');
const favoriteSection = document.getElementById('favoriteSection');

let searchHistory =
  JSON.parse(localStorage.getItem('searchHistory')) || [];

let favorites =
  JSON.parse(localStorage.getItem('favorites')) || [];

renderHistory();
renderFavorites();

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const keyword = cityInput.value.trim();

  if (!keyword) {
    showError('都市名・都道府県名・郵便番号を入力してください。');
    return;
  }

  await searchWeather(keyword);
});

async function searchWeather(keyword) {
  try {
    showLoading();

    const [weatherData, forecastData] =
      await fetchWeatherData(keyword);

    showWeather(weatherData);

    showFavoriteButton(
      weatherData.name,
      isFavorite(weatherData.name),
      toggleFavorite
    );

    showForecast(forecastData);

    addHistory(weatherData.name);
  } catch (error) {
    showError(error.message);
  }
}

async function fetchWeatherData(keyword) {
  if (isZipCode(keyword)) {
    return await Promise.all([
      fetchWeatherByZip(keyword),
      fetchForecastByZip(keyword)
    ]);
  }

  return await Promise.all([
    fetchWeatherByCity(keyword),
    fetchForecastByCity(keyword)
  ]);
}

function isZipCode(keyword) {
  return /^\d{3}-?\d{4}$/.test(keyword);
}

function addHistory(cityName) {
  searchHistory =
    searchHistory.filter((city) => city !== cityName);

  searchHistory.unshift(cityName);

  searchHistory = searchHistory.slice(0, 5);

  localStorage.setItem(
    'searchHistory',
    JSON.stringify(searchHistory)
  );

  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = '';

  if (searchHistory.length === 0) {
    historySection.style.display = 'none';
    return;
  }

  historySection.style.display = 'block';

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

function toggleFavorite(cityName) {
  if (favorites.includes(cityName)) {
    favorites = favorites.filter(
      (city) => city !== cityName
    );
  } else {
    favorites.unshift(cityName);
    favorites = favorites.slice(0, 5);
  }

  localStorage.setItem(
    'favorites',
    JSON.stringify(favorites)
  );

  renderFavorites();

  showFavoriteButton(
    cityName,
    isFavorite(cityName),
    toggleFavorite
  );
}

function isFavorite(cityName) {
  return favorites.includes(cityName);
}

function renderFavorites() {
  favoriteList.innerHTML = '';

  if (favorites.length === 0) {
    favoriteSection.style.display = 'none';
    return;
  }

  favoriteSection.style.display = 'block';

  favorites.forEach((cityName) => {
    const li = document.createElement('li');

    li.textContent = cityName;

    li.addEventListener('click', () => {
      cityInput.value = cityName;
      searchWeather(cityName);
    });

    favoriteList.appendChild(li);
  });
}

const currentLocationBtn =
  document.getElementById('currentLocationBtn');

currentLocationBtn.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        showLoading();

        const {
          latitude,
          longitude
        } = position.coords;

        const [weatherData, forecastData] =
          await Promise.all([
            fetchWeatherByLocation(
              latitude,
              longitude
            ),
            fetchForecastByLocation(
              latitude,
              longitude
            )
          ]);

        showWeather(weatherData);

        showFavoriteButton(
          weatherData.name,
          isFavorite(weatherData.name),
          toggleFavorite
        );

        showForecast(forecastData);
      } catch (error) {
        showError(error.message);
      }
    },
    () => {
      showError(
        '位置情報取得が許可されませんでした'
      );
    }
  );
});