const api = {
  key: 'ab2dcae9fd1e77467d2a54a3ed4f9007',
  url: 'https://api.openweathermap.org/data/2.5/'
};
let weatherData = {};

const searchByKey = document.querySelector('.search-key');
const searchByBtn = document.querySelector('.search-btn');

const keySearch = (e) => {
  if(e.code == 'Enter') {
    getData(searchByKey.value);
  }
}

const btnSearch = (e) => {
  getData(searchByKey.value);
  e.preventDefault();
}

searchByKey.addEventListener('keypress', keySearch);
searchByBtn.addEventListener('click', btnSearch);

(() => {
  axios.get(`${api.url}weather?q=Taichung&units=metric&id=524901&lang=zh_tw&appid=${api.key}`)
  .then((res) => {
    weatherData = res.data;
    render();
  }).catch(() => {
    Swal.fire(
      'Oops...',
      'We got a little problem, please refresh.',
      'error',
    );
  });
})();

const getData = (cityName) => {
  axios.get(`${api.url}weather?q=${cityName}&units=metric&id=524901&lang=zh_tw&appid=${api.key}`)
  .then((res) => {
    weatherData = res.data;
    render();
  }).catch(() => {
    Swal.fire(
      'Oops...',
      'Please typing correct city name.',
      'error',
    );
  });
}

const render = () => {
  let city = document.querySelector('.city');
  city.innerHTML = `${weatherData.name}, ${weatherData.sys.country}`;
  const now = new Date();
  let date = document.querySelector('.date');
  date.innerHTML = dateNow(now);

  let temp = document.querySelector('.temp');
  temp.innerHTML = `${Math.round(weatherData.main.temp)}°c`;

  let weather = document.querySelector('.weather');
  weather.innerHTML = `${weatherData.weather[0].description}`;

  let minmaxTemp = document.querySelector('.min-max');
  minmaxTemp.innerHTML = `${Math.round(weatherData.main.temp_min)}°c / ${Math.round(weatherData.main.temp_max)}°c`;
}

const dateNow = (d) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
