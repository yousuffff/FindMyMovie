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
    <div className="min-h-screen bg-black text-white">
      {/* Hero Backdrop Section */}
      <div className="relative h-[60vh] w-full">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

        {/* Title Over Backdrop */}
        <div className="absolute bottom-10 left-10">
          <h1 className="text-4xl md:text-6xl font-bold">{movie.title}</h1>
          <p className="text-gray-300 mt-2 text-lg">
            ⭐ {movie.vote_average} | 📅 {movie.release_date}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Poster */}
          <div className="flex-shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-72 rounded-xl shadow-2xl border border-gray-700"
            />
          </div>

          {/* Movie Info */}
          <div className="flex-1">
            {/* Genres */}
            <div className="flex gap-2 flex-wrap mb-4">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Runtime */}
            <p className="text-gray-400 mb-4">
              ⏱ Runtime: {movie.runtime} minutes
            </p>

            {/* Overview */}
            <h2 className="text-2xl font-semibold mb-3">Overview</h2>
            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
