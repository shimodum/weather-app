const API_KEY = 'f8a318faa31590b831d6a996999ae36f';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function fetchWeatherByCity(cityName) {
  const url = `${BASE_URL}?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric&lang=ja`;

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