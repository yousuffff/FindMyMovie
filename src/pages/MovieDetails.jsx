import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Spinner from "../components/Spinner";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_TOKEN;

const API_OPTION = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/movie/${id}`, API_OPTION);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <Spinner fullScreen />;
  }

  if (!movie) {
    return <div className="text-white text-center mt-10">Movie not found</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Backdrop */}
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full rounded-xl"
          />
        </div>

        {/* Movie Info */}
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          {/* Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-64 rounded-lg shadow-lg"
          />

          {/* Details */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

            <p className="text-gray-400 mb-2">⭐ {movie.vote_average} / 10</p>

            <p className="text-gray-400 mb-2">📅 {movie.release_date}</p>

            <p className="text-gray-400 mb-4">⏱ {movie.runtime} minutes</p>

            <div className="flex gap-2 flex-wrap mb-4">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-red-600 px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
