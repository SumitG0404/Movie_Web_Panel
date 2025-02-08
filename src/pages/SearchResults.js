import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const BASE_URL = "https://api.themoviedb.org/3";

const SearchResults = () => {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`, {
          params: { api_key: API_KEY, query },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div className="search-results">
      <h1>Search Results for "{query}"</h1>

      {loading ? <h2>Loading...</h2> : (
        <div className="movie-grid">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-card">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <h5>{movie.title}</h5>
                <p>Rating:{movie.vote_average}/10</p>
              </Link>
            ))
          ) : (
            <h2>No results found</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
