const api = {
  key: "ec21c869a65a7510afba4baa7084dd8d",
  baseurl: "https://api.openweathermap.org/data/2.5/"
};
const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
   
  }
}

function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temperature = document.querySelector(".current .temp");
  temperature.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weathercondition = document.querySelector(".current .weather");
  weathercondition.innerText = `${weather.weather[0].main}`;

  let highlow = document.querySelector(".current .hi-low");
  highlow.innerText = `${weather.main.temp_max}°c / ${weather.main.temp_min}°c`;

  let feelsLike= document.querySelector(".current .feelsLike");
  feelsLike.innerText = `Feels like: ${weather.main.feels_like}°c`;

  let humidity = document.querySelector(".current .humidity");
  humidity.innerText = `Humidity: ${weather.main.humidity}%`;

  let wind = document.querySelector(".current .wind");
  wind.innerText = `Wind Speed: ${weather.wind.speed}km/h`;

}

function dateBuilder(d) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
