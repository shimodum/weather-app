const API_KEY = 'f8a318faa31590b831d6a996999ae36f';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const GEO_BASE_URL = 'https://api.openweathermap.org/geo/1.0/direct';

export async function fetchWeatherByCity(cityName) {
  const location = await fetchLocationByCity(cityName);

  const url =
    `${WEATHER_BASE_URL}?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric&lang=ja`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      '天気情報取得中にエラーが発生しました。'
    );
  }

  return await response.json();
}

async function fetchLocationByCity(cityName) {
  const url =
    `${GEO_BASE_URL}?q=${encodeURIComponent(cityName)}&limit=5&appid=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      '都市情報取得中にエラーが発生しました。'
    );
  }

  const locations = await response.json();

  if (locations.length === 0) {
    throw new Error(
      '都市が見つかりません。入力を確認してください。'
    );
  }

  // 完全一致優先
  const exactMatch = locations.find(location =>
    location.name.toLowerCase() === cityName.toLowerCase()
  );

  return exactMatch || locations[0];
}