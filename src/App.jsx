import { useEffect, useState } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_TOKEN;
console.log(API_KEY);

const API_OPTION = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [debounceText, setDebounceText] = useState("");
  useDebounce(() => setDebounceText(searchText), 500, [searchText]);
  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTION);
      if (!response.ok) {
        throw new Error("Failed to fetch movie");
      }
      const data = await response.json();
      console.log(data.results);

      if (data.Result === "false") {
        throw new Error("Failed to fetch movie");
      }
      setMovieList(data.results || []);
    } catch (error) {
      console.log(error);
      setErrorMessage("Error fetching movies. Please try again later");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchMovies(debounceText);
  }, [debounceText]);
  return (
    <main>
      <div className="pattern"></div>
      <div className="wrapper">
        <header>
          <img src="hero.png" alt="poster-img" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll enjoy
            without the Hassle
          </h1>
          <Search searchText={searchText} setSearchText={setSearchText} />
        </header>
        <section className="all-movies  mt-10">
          <h2>All movies</h2>
          {isloading ? (
            <Spinner />
          ) : errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
