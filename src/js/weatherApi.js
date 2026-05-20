import { CONFIG } from './config.js';

const API_KEY = CONFIG.API_KEY;
const BASE_URL ='https://api.openweathermap.org/data/2.5/weather';

export async function fetchWeatherByCity(cityName) {

  const normalizedCityName =
    normalizeCityName(cityName);

  const url =
    `${BASE_URL}?q=${encodeURIComponent(normalizedCityName)}&appid=${API_KEY}&units=metric&lang=ja`;

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

function normalizeCityName(cityName) {
  const cityMap = {
    '東京': 'Tokyo',
    '大阪': 'Osaka',
    '札幌': 'Sapporo',
    '京都': 'Kyoto',
    '名古屋': 'Nagoya',
    '福岡': 'Fukuoka'
  };

  return cityMap[cityName] || cityName;
}

export async function fetchWeatherByLocation(
  lat,
  lon
) {

  const url =
    `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ja`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      '現在地の天気情報取得に失敗しました'
    );
  }

  return await response.json();
}