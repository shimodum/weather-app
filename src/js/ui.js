export function showWeather(data) {
  const weatherResult = document.getElementById('weatherResult');

  const icon = data.weather[0].icon;

  const iconUrl =
    `https://openweathermap.org/img/wn/${icon}@2x.png`;

  weatherResult.innerHTML = `
    <h2>${data.name}</h2>

    <img
      src="${iconUrl}"
      alt="weather-icon"
    >

    <p>天気：${data.weather[0].description}</p>
    <p>気温：${Math.round(data.main.temp)}℃</p>
    <p>湿度：${data.main.humidity}%</p>
    <p>風速：${data.wind.speed} m/s</p>
  `;
}

export function showError(message) {
  const weatherResult = document.getElementById('weatherResult');

  weatherResult.innerHTML = `
    <p class="error">${message}</p>
  `;
}

export function showLoading() {
  const weatherResult = document.getElementById('weatherResult');

  weatherResult.innerHTML = `
    <p>読み込み中...</p>
  `;
}