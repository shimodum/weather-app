export function showWeather(data) {
  const weatherResult = document.getElementById('weatherResult');

  weatherResult.style.display = 'block';

  const icon = data.weather[0].icon;

  const iconUrl =
    `https://openweathermap.org/img/wn/${icon}@2x.png`;

  updateBackground(data.weather[0].main);

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

  weatherResult.style.display = 'block';

  document.body.className = '';

  weatherResult.innerHTML = `
    <p class="error">${message}</p>
  `;
}

export function showLoading() {
  const weatherResult = document.getElementById('weatherResult');

  weatherResult.style.display = 'block';

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