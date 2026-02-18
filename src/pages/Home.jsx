import { useEffect, useState } from "react";
import Search from "../components/Search";
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";
import { useDebounce } from "react-use";
import { getTrending, updateSearchCount } from "../appwrite";
import Pagination from "../components/Pagination";
import { Link } from "react-router";
import { API_BASE_URL, API_OPTION } from "../constant";

function Home() {
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [trendingMovie, setTrendingMovie] = useState([]);
  const [debounceText, setDebounceText] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useDebounce(() => setDebounceText(searchText), 500, [searchText]);
  // console.log(trendingMovie);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTION);
      if (!response.ok) {
        throw new Error("Failed to fetch movie");
      }
      const data = await response.json();
      // console.log(data);

      if (data.Result === "false") {
        throw new Error("Failed to fetch movie");
      }
      // console.log(data.total_pages);
      setTotalPages(data.total_pages);
      setMovieList(data.results || []);
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);

        const updatedTrending = await getTrending();
        setTrendingMovie(updatedTrending.documents);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Error fetching movies. Please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debounceText);
  }, [debounceText, page]);

  useEffect(() => {
    setPage(1);
  }, [debounceText]);

  useEffect(() => {
    const fetchTrendingMovie = async () => {
      try {
        const movie = await getTrending();
        // console.log(movie);
        setTrendingMovie(movie.documents);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrendingMovie();
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="hero.png" alt="poster-img" />
            <h1>
              Find <span className="text-gradient">Movies</span> You'll enjoy
              without the Hassle
            </h1>
            <Search searchText={searchText} setSearchText={setSearchText} />
          </header>
          {trendingMovie.length > 0 && (
            <section className="trending">
              <h2>🔥Trending Movie</h2>
              <ul>
                {trendingMovie.map((movie, index) => (
                  <Link to={"/movie/" + movie.movie_id} key={movie.movie_id}>
                    <li key={movie.$id}>
                      <p>{index + 1}</p>
                      <img src={movie.poster_url} alt="movie poster" />
                    </li>
                  </Link>
                ))}
              </ul>
            </section>
          )}

          <section className="all-movies mt-10">
            <h2>All movies</h2>
            {isloading ? (
              <Spinner />
            ) : errorMessage ? (
              <p>{errorMessage}</p>
            ) : (
              <ul>
                {movieList.map((movie) => (
                  <Link to={"/movie/" + movie.id} key={movie.id}>
                    <MovieCard movie={movie} />
                  </Link>
                ))}
              </ul>
            )}
          </section>
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}

export default Home;
