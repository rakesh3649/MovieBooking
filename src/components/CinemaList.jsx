import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CinemaList = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cinemas, setCinemas] = useState([]);

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    const selectedMovie = movies.find(m => m.id === parseInt(movieId));
    
    if (!selectedMovie) {
      navigate('/');
      return;
    }
    
    setMovie(selectedMovie);
    
    const storedCinemas = JSON.parse(localStorage.getItem('cinemas')) || [];
    const availableCinemas = storedCinemas.filter(cinema => 
      cinema.movies.includes(parseInt(movieId))
    );
    
    setCinemas(availableCinemas);
  }, [movieId, navigate]);

  const handleCinemaSelect = (cinemaId) => {
    navigate(`/showtimes/${movieId}/${cinemaId}`);
  };

  if (!movie) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }

  return (
    <div className="cinema-list">
      <div className="movie-header">
        <div className="movie-header-content">
          <div className="movie-header-poster">
            <img src={movie.poster} alt={movie.title} onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300x450?text=Movie+Poster';
            }} />
          </div>
          <div className="movie-header-info">
            <h1>{movie.title}</h1>
            <div className="movie-meta">
              <span className="meta-item">{movie.year}</span>
              <span className="meta-divider">•</span>
              <span className="meta-item">{movie.language}</span>
              <span className="meta-divider">•</span>
              <span className="meta-item">{movie.genre}</span>
            </div>
            <div className="movie-rating-display">
              <span className="rating-value">{movie.rating}</span>
              <span className="rating-label">/10 IMDb</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="cinema-selection">
        <h2>🎭 Select Cinema Hall</h2>
        <p>Choose where you want to watch the movie</p>
        
        <div className="cinemas-grid">
          {cinemas.length === 0 ? (
            <div className="no-cinemas">
              <p>No cinemas available for this movie in your area</p>
            </div>
          ) : (
            cinemas.map(cinema => (
              <div 
                key={cinema.id} 
                className="cinema-card"
                onClick={() => handleCinemaSelect(cinema.id)}
              >
                <div className="cinema-icon">
                  <span>🎬</span>
                </div>
                <div className="cinema-details">
                  <h3>{cinema.name}</h3>
                  <p className="cinema-location">{cinema.location}</p>
                  <div className="cinema-features">
                    <span className="feature">🎦 IMAX Available</span>
                    <span className="feature">🍿 Food Court</span>
                    <span className="feature">🅿️ Parking</span>
                  </div>
                </div>
                <div className="cinema-action">
                  <button className="btn btn-primary">
                    Select
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CinemaList;