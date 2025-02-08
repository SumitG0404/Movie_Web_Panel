import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";

const API_KEY = "c45a857c193f6302f2b5061c3b85e743"; 

const UpcomingPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching upcoming movies:", error);
      });
  }, []);

  return (
    <div className="upcoming-container">
      <h1>Upcoming Movies</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h5>{movie.title}</h5>
            <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UpcomingPage;
