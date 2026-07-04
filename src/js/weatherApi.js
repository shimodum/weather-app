import { CONFIG } from './config.js';
import { cityMap } from './cityMap.js';

const API_KEY = CONFIG.API_KEY;

const WEATHER_BASE_URL =
  'https://api.openweathermap.org/data/2.5/weather';

const FORECAST_BASE_URL =
  'https://api.openweathermap.org/data/2.5/forecast';

export async function fetchWeatherByCity(cityName) {
  const normalizedCityName =
    normalizeCityName(cityName);

  const url =
    `${WEATHER_BASE_URL}?q=${encodeURIComponent(normalizedCityName)}&appid=${API_KEY}&units=metric&lang=ja`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        '都市が見つかりません。入力を確認してください。'
      );
    }

    throw new Error(
      '天気情報取得中にエラーが発生しました。'
    );
  }

  return await response.json();
}

export async function fetchWeatherByLocation(
  lat,
  lon
) {
  const url =
    `${WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ja`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      '現在地の天気情報取得に失敗しました'
    );
  }

  return await response.json();
}

export async function fetchForecastByCity(cityName) {
  const normalizedCityName =
    normalizeCityName(cityName);

  const url =
    `${FORECAST_BASE_URL}?q=${encodeURIComponent(normalizedCityName)}&appid=${API_KEY}&units=metric&lang=ja`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      '5日間予報の取得に失敗しました。'
    );
  }

  return await response.json();
}

export async function fetchForecastByLocation(
  lat,
  lon
) {
  const url =
    `${FORECAST_BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ja`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      '現在地の5日間予報の取得に失敗しました。'
    );
  }

  return await response.json();
}

export async function fetchWeatherByZip(zipCode) {
  const normalizedZipCode =
    normalizeZipCode(zipCode);

  const url =
    `${WEATHER_BASE_URL}?zip=${normalizedZipCode},JP&appid=${API_KEY}&units=metric&lang=ja`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      '郵便番号から天気情報を取得できませんでした。'
    );
  }

  return await response.json();
}

export async function fetchForecastByZip(zipCode) {
  const normalizedZipCode =
    normalizeZipCode(zipCode);

  const url =
    `${FORECAST_BASE_URL}?zip=${normalizedZipCode},JP&appid=${API_KEY}&units=metric&lang=ja`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      '郵便番号から5日間予報を取得できませんでした。'
    );
  }

  return await response.json();
}

function normalizeCityName(cityName) {
  return cityMap[cityName] || cityName;
}

function normalizeZipCode(zipCode) {
  return zipCode.replace('-', '');
}