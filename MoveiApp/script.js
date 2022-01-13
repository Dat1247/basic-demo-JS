const APIURL = 'https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovie(APIURL);


async function getMovie(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData.results);

    showMovies(respData.results);
}

function showMovies(movies) {
    main.innerHTML = "";

    movies.forEach(movie => {
        const movieEl = document.createElement('div');
        const { poster_path, original_title, vote_average, overview } = movie;
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
            <img src="${IMGPATH + poster_path}" alt="${original_title}">
            <div class="movie__info">
                <h3>${original_title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
            <h4>Overview: </h4>
                ${overview}
            </div>
        `;

        main.appendChild(movieEl);
    })
}

function getClassByRate(rate) {
    if (rate >= 8) {
        return 'green';
    } else if (rate >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchValue = search.value;
    if (searchValue) {
        getMovie(SEARCHAPI + searchValue);

        search.value = "";
    }
});