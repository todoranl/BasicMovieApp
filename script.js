const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';
// API for the data

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Get initial movies
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    // extract data from api

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    // Limit the overview text to x number of characters
    const limitedOverview =
      overview.length > 200 ? `${overview.substring(0, 150)}...` : overview;

    movieEl.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${limitedOverview}
      </div>
    `;
    main.appendChild(movieEl);
  });
}
//Define the function for the rating
function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
//Structure for the Search button
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});

// Add a Home button click event handler
const homeButton = document.createElement("button");
homeButton.textContent = "HomePage";
homeButton.id = "homeButton";
// Adăugați clasa CSS la buton
homeButton.classList.add("home-button");
homeButton.style.position = "absolute"; // Set the position to absolute
homeButton.style.left = "155px"; // Set the left position (adjust as needed)
homeButton.style.top = "10px";

// Append the Home button to the header or navigation
const header = document.querySelector("header"); // You may need to adjust the selector
header.appendChild(homeButton);

// Event listener for the Home button
homeButton.addEventListener("click", () => {
  window.location.href = "index.html";
});
