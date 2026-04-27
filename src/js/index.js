//TODO: API (https://openweathermap.org/api/current?collection=current_forecast)

/*
TODO: Weather card template:

<div class="weather-card">
  <h2 class="city-name"></h2>
  <ul class="weather-info list">
    <li class="weather-info-item">
        <p class="temp">Температура: <sup>&#176;</sup></p>
    </li>
    <li class="weather-info-item">
        <p class="feels-like-temp">Відчувається як: <sup>&#176;</sup></p>
    </li>
    <li class="weather-info-item">
        <p class="sunrise-time">Схід сонця: </p>
    </li>
    <li class="weather-info-item">
        <p class="sunset-time">Захід сонця: </p>
    </li>
    <li class="weather-info-item">
        <p class="clouds">Хмарність: %</p>
    </li>
  </ul>
</div>
*/
import { createWeatherCardTemplate } from './render-functions';
import { convertSecondsTohoursAndMinutes } from './helpers';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  weatherContainer: document.querySelector('.js-weather-wrapper'),
};

refs.searchForm.addEventListener('submit', e => {
  e.preventDefault();

  const cityName = e.target.elements.user_country.value.trim();
  const API_KEY = `cbbba787f95f993be659a3c0103f8589`;

  if (!cityName) {
    return alert('Fill the search field');
  }

  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${API_KEY}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }

      return res.json();
    })
    .then(data => {
      if (data.length === 0) {
        return alert('Wrong city');
      }

      const { lat, lon } = data[0];

      return fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }

      return res.json();
    })
    .then(data => {
      data.sys.sunrise = convertSecondsTohoursAndMinutes(data.sys.sunrise);
      data.sys.sunset = convertSecondsTohoursAndMinutes(data.sys.sunset);
      const weatherCardTemplate = createWeatherCardTemplate(data);
      refs.weatherContainer.innerHTML = weatherCardTemplate;
    })
    .catch(err => console.log(err));
});
