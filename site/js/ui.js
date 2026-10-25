export function showWeather(data) {
  const weatherResult = document.getElementById('weatherResult');

  weatherResult.style.display = 'block';

  const icon = data.weather[0].icon;

  const iconUrl =
    `https://openweathermap.org/img/wn/${icon}@2x.png`;

  updateBackground(data.weather[0].main);

  weatherResult.innerHTML = `
    <h2>${data.name}</h2>

    <div id="favoriteButtonArea"></div>

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

export function showFavoriteButton(
  cityName,
  isFavorite,
  onToggleFavorite
) {
  const favoriteButtonArea =
    document.getElementById('favoriteButtonArea');

  if (!favoriteButtonArea) {
    return;
  }

  favoriteButtonArea.innerHTML = `
    <button
      id="favoriteButton"
      class="${isFavorite ? 'favorite-active' : ''}"
    >
      ${isFavorite ? '★ 登録済み' : '☆ お気に入り登録'}
    </button>
  `;

  document
    .getElementById('favoriteButton')
    .addEventListener('click', () => {
      onToggleFavorite(cityName);
    });
}

export function showForecast(data) {
  const forecastResult = document.getElementById('forecastResult');

  forecastResult.style.display = 'block';

  const dailyForecasts = data.list.filter((forecast) =>
    forecast.dt_txt.includes('12:00:00')
  );

  forecastResult.innerHTML = `
    <h2>5日間予報</h2>

    <div class="forecast-list">
      ${dailyForecasts.map((forecast) => {
        const date = formatDate(forecast.dt_txt);
        const icon = forecast.weather[0].icon;
        const iconUrl =
          `https://openweathermap.org/img/wn/${icon}@2x.png`;

        return `
          <div class="forecast-card">
            <p class="forecast-date">${date}</p>

            <img
              src="${iconUrl}"
              alt="forecast-icon"
            >

            <p>${forecast.weather[0].description}</p>
            <p>${Math.round(forecast.main.temp)}℃</p>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

export function showError(message) {
  const weatherResult = document.getElementById('weatherResult');
  const forecastResult = document.getElementById('forecastResult');

  weatherResult.style.display = 'block';

  if (forecastResult) {
    forecastResult.style.display = 'none';
  }

  document.body.className = '';

  weatherResult.innerHTML = `
    <p class="error">${message}</p>
  `;
}

export function showLoading() {
  const weatherResult = document.getElementById('weatherResult');
  const forecastResult = document.getElementById('forecastResult');

  weatherResult.style.display = 'block';

  if (forecastResult) {
    forecastResult.style.display = 'none';
  }

  weatherResult.innerHTML = `
    <p>読み込み中...</p>
  `;
}

function updateBackground(weatherMain) {
  document.body.className = '';

  switch (weatherMain) {
    case 'Clear':
      document.body.classList.add('sunny');
      break;

    case 'Clouds':
      document.body.classList.add('cloudy');
      break;

    case 'Rain':
      document.body.classList.add('rainy');
      break;

    case 'Snow':
      document.body.classList.add('snowy');
      break;

    default:
      break;
  }
}

function formatDate(dateText) {
  const date = new Date(dateText);

  const month = date.getMonth() + 1;
  const day = date.getDate();

  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  const weekday = weekdays[date.getDay()];

  return `${month}/${day}（${weekday}）`;
}