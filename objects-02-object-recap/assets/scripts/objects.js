// const person = {
//   "first name": "Sanjay",
//   name: "Max",
//   position: "jrf",
//   age: 30,
//   hobbies: ["Sports", "Cooking"],
//   greet: function() {
//     alert("Hi there!");
//   },
//   3.5: "Hi"
// };

// person.greet();

// person.age = 25;
// person.isAdmin = true;
// delete person.name;
// person.position = null;

// console.log(person);
// console.log(person["first name"]);
// console.log(person[3.5]);

const addMovieButton = document.getElementById("add-movie-btn");
const searchButton = document.getElementById("search-btn");

const movies = [];

const renderMovies = (filter = "") => {
  const movieList = document.getElementById("movie-list");

  if (movies.length === 0) {
    movieList.classList.remove("visible");
    return;
  } else {
    movieList.classList.add("visible");
  }
  movieList.innerHTML = "";
  const filterMovies = !filter
    ? movies
    : movies.filter(movie => movie.info.title.includes(filter));
  filterMovies.forEach(movie => {
    const movieEl = document.createElement("li");
    const { info, ...otherProp } = movie;
    console.log(otherProp);
    const { title: movieTitle } = info;

    let { getFormattedTitle } = movie;
    // getFormattedTitle = getFormattedTitle.bind(movie);
    // let text = getFormattedTitle() + " - ";

    // let text = getFormattedTitle.call(movie) + " - ";

    let text = getFormattedTitle.apply(movie) + " - ";

    for (const key in info) {
      if (key !== "title" && key !== "_title") {
        text = text + `${key} : ${info[key]}`;
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

const addMovieHandler = () => {
  const title = document.getElementById("title").value;
  const extraName = document.getElementById("extra-name").value;
  const extraValue = document.getElementById("extra-value").value;

  if (extraName.trim() === "" || extraValue.trim() === "") {
    return;
  }
  const newMovie = {
    info: {
      set title(val) {
        if (val.trim() === "") {
          this._title = "DEFAULT";
          return;
        }
        this._title = val;
      },
      get title() {
        return this._title;
      },
      [extraName]: extraValue
    },
    id: Math.random(),
    getFormattedTitle() {
      return this.info.title.toUpperCase();
    }
  };
  newMovie.info.title = title;

  movies.push(newMovie);
  renderMovies();
  console.log(movies);
};

const searchMovieHandler = () => {
  const filterTerm = document.getElementById("filter-title").value;
  renderMovies(filterTerm);
};

addMovieButton.addEventListener("click", addMovieHandler);
searchButton.addEventListener("click", searchMovieHandler);
