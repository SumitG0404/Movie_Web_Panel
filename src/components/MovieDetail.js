import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css"; 

const API_KEY = "c45a857c193f6302f2b5061c3b85e743"; 
const BASE_URL = "https://api.themoviedb.org/3";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`);
        setMovie(response.data);
        setCast(response.data.credits?.cast?.slice(0, 6) || []);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <h2>Loading...</h2>;

  return (
    <div className="movie-detail">
      <div className="movie-content">
        <div className="movie-left">
          <div className="movie-poster">
            {movie.poster_path ? (
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            ) : (
              <p>No Poster Available</p>
            )}
          </div>
        </div>

        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p><strong> Rating:</strong> {movie.vote_average || "N/A"} / 10</p>
          <p><strong> Duration:</strong> {movie.runtime ? `${movie.runtime} mins` : "N/A"}</p>
          <p><strong> Release Date:</strong> {movie.release_date || "N/A"}</p>
          <p><strong> Genre:</strong> {movie.genres ? movie.genres.map((g) => g.name).join(", ") : "N/A"}</p>
          <p className="movie-overview"><strong> Overview:</strong> {movie.overview || "No overview available."}</p>
        </div>
      </div>

      <h2 className="cast-title"> Cast</h2>
      <div className="cast-list">
        {cast.length > 0 ? (
          cast.map((actor) => (
            <div key={actor.id} className="cast-member">
              {actor.profile_path ? (
                <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
              ) : (
                <p>No Image</p>
              )}
              <p className="cast-name">{actor.name}</p>
              <p className="cast-role">as {actor.character}</p>
            </div>
          ))
        ) : (
          <p>No Cast Available</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
