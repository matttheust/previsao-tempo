const apiKey = '28c56ef87259c70a0515ccb59f0355ed';

const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

function displayError(message) {
  weatherInfo.innerHTML = `<p>${message}</p>`;
}

function getWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Cidade não encontrada');
      }
      return response.json();
    })
    .then(data => {
      const { name, sys, main, weather, wind } = data;
      const temperature = Math.round(main.temp);
      const weatherIcon = weather[0].icon;
      const weatherDescription = weather[0].description;
      const windSpeed = Math.round(wind.speed);
      const humidity = Math.round(main.humidity);

      const weatherIconUrl = `http://openweathermap.org/img/w/${weatherIcon}.png`;

      weatherInfo.innerHTML = `
        <h2>${name}, ${sys.country}</h2>
        <img src="${weatherIconUrl}" alt="${weatherDescription}" style="width: 100px;">
        <p>Temperatura: ${temperature}°C</p>
        <p>Descrição: ${weatherDescription}</p>
        <p>Velocidade do Vento: ${windSpeed} m/s</p>
        <p>Umidade: ${humidity}%</p>
      `;
    })
    .catch(error => {
      console.error('Ocorreu um erro:', error);
    });
}

searchButton.addEventListener('click', () => {
  const city = cityInput.value;

  if (city === '') {
    alert('Por favor, insira o nome da cidade');
    return;
  }

  getWeather(city);
});

const defaultCity = 'Nome da Cidade'; // Substitua pelo nome da cidade desejada
getWeather(defaultCity);
