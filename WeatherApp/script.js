const apikey = 'edfe2569d6f0396acc2c0cb6df6c7587';
const url = (location) => `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

async function getWeatherByLocation(location) {
    const resp = await fetch(url(location));
    const respData = await resp.json();

    console.log(respData);
    console.log(KtoC(respData.main.temp))

    addWeatherToPage(respData, location)
}

function addWeatherToPage(data, location) {
    const temp = KtoC(data.main.temp);

    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
        <h2>${temp}°C
            <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        </h2>
    `;

    main.innerHTML = "";

    main.appendChild(weather);
}

function KtoC(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    if (location) {
        getWeatherByLocation(location);
    }
})