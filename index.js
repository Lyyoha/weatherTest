(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&e(o)}).observe(document,{childList:!0,subtree:!0});function i(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function e(t){if(t.ep)return;t.ep=!0;const s=i(t);fetch(t.href,s)}})();function c(r){const n=new Date(r*1e3),i=String(n.getHours()).padStart(2,"0"),e=String(n.getMinutes()).padStart(2,"0");return`${i}:${e}`}function a(r){return`<div class="weather-card">
        <h2 class="city-name">${r.name}</h2>
        <ul class="weather-info list">
          <li class="weather-info-item">
            <p class="temp">
              Температура: ${r.main.temp}<sup>&#176;</sup>
            </p>
          </li>
          <li class="weather-info-item">
            <p class="feels-like-temp">
              Відчувається як: ${r.main.feels_like}<sup>&#176;</sup>
            </p>
          </li>
          <li class="weather-info-item">
            <p class="sunrise-time">Схід сонця: ${r.sys.sunrise}</p>
          </li>
          <li class="weather-info-item">
            <p class="sunset-time">Захід сонця: ${r.sys.sunset}</p>
          </li>
          <li class="weather-info-item">
            <p class="clouds">Хмарність: ${r.clouds.all}%</p>
          </li>
        </ul>
      </div>
    `}const l={searchForm:document.querySelector(".js-search-form"),weatherContainer:document.querySelector(".js-weather-wrapper")};l.searchForm.addEventListener("submit",r=>{r.preventDefault();const n=r.target.elements.user_country.value.trim(),i="cbbba787f95f993be659a3c0103f8589";if(!n)return alert("Fill the search field");fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${n}&appid=${i}`).then(e=>{if(!e.ok)throw new Error(e.status);return e.json()}).then(e=>{if(e.length===0)return alert("Wrong city");const{lat:t,lon:s}=e[0];return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${s}&appid=${i}&units=metric`)}).then(e=>{if(!e.ok)throw new Error(e.status);return e.json()}).then(e=>{e.sys.sunrise=c(e.sys.sunrise),e.sys.sunset=c(e.sys.sunset);const t=a(e);l.weatherContainer.innerHTML=t}).catch(e=>console.log(e))});
//# sourceMappingURL=index.js.map
