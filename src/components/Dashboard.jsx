import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Initial movies data with Indian cities and prices - ALL IMAGE URLs FIXED
// Updated initialMovies array with working TMDB image URLs
const initialMovies = [
  {
    id: 1,
    title: "Avatar: The Way of Water",
    year: 2022,
    rating: 7.9,
    language: "English",
    genre: "Action, Adventure, Fantasy",
    duration: "3h 12m",
    poster: "https://image.tmdb.org/t/p/w500/94xxm5701CzOdJdUEdIuwqZaowx.jpg",
    cities: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad"],
    prices: {
      standard: 250,
      premium: 400,
      vip: 600
    }
  },
  {
    id: 2,
    title: "The Batman",
    year: 2022,
    rating: 7.8,
    language: "English",
    genre: "Action, Crime, Drama",
    duration: "2h 56m",
    poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    cities: ["Mumbai", "Delhi", "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh"],
    prices: {
      standard: 250,
      premium: 400,
      vip: 600
    }
  },
  {
    id: 3,
    title: "RRR",
    year: 2022,
    rating: 8.0,
    language: "Telugu",
    genre: "Action, Drama",
    duration: "3h 7m",
    poster: "https://image.tmdb.org/t/p/w500/6l9gL7YQ3KZ56KxZ4lAqKZ8L5c.jpg",
    cities: ["Hyderabad", "Chennai", "Bangalore", "Mumbai", "Delhi", "Kolkata", "Pune", "Coimbatore"],
    prices: {
      standard: 200,
      premium: 350,
      vip: 500
    }
  },
  {
    id: 4,
    title: "Everything Everywhere All at Once",
    year: 2022,
    rating: 8.3,
    language: "English",
    genre: "Action, Adventure, Comedy",
    duration: "2h 19m",
    poster: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    cities: ["Mumbai", "Bangalore", "Delhi", "Hyderabad", "Pune", "Chennai", "Kolkata"],
    prices: {
      standard: 250,
      premium: 400,
      vip: 600
    }
  },
  {
    id: 5,
    title: "Top Gun: Maverick",
    year: 2022,
    rating: 8.2,
    language: "English",
    genre: "Action, Drama",
    duration: "2h 10m",
    poster: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    cities: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad"],
    prices: {
      standard: 250,
      premium: 400,
      vip: 600
    }
  },
  {
    id: 6,
    title: "KGF: Chapter 2",
    year: 2022,
    rating: 8.2,
    language: "Kannada",
    genre: "Action, Drama, Thriller",
    duration: "2h 48m",
    poster: "https://image.tmdb.org/t/p/w500/geYUecpFI2AonDLhjyK9zoVFcM.jpg",
    cities: ["Bangalore", "Mumbai", "Chennai", "Hyderabad", "Delhi", "Pune", "Mysuru", "Hubli"],
    prices: {
      standard: 200,
      premium: 350,
      vip: 500
    }
  },
  {
    id: 7,
    title: "Jawan",
    year: 2023,
    rating: 8.0,
    language: "Hindi",
    genre: "Action, Thriller",
    duration: "2h 49m",
    poster: "https://image.tmdb.org/t/p/w500/gyl8O2A4mETOh2f7Yl3B2d6pE3C.jpg",
    cities: ["Mumbai", "Delhi", "Kolkata", "Chennai", "Bangalore", "Hyderabad", "Lucknow", "Jaipur"],
    prices: {
      standard: 250,
      premium: 400,
      vip: 600
    }
  },
  {
    id: 8,
    title: "Animal",
    year: 2023,
    rating: 7.0,
    language: "Hindi",
    genre: "Action, Crime, Drama",
    duration: "3h 21m",
    poster: "https://image.tmdb.org/t/p/w500/5gzzkR7y3hnY8AD1wXjCnVlHba5.jpg",
    cities: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Ahmedabad", "Chandigarh", "Lucknow"],
    prices: {
      standard: 250,
      premium: 400,
      vip: 600
    }
  },
  {
    id: 9,
    title: "Oppenheimer",
    year: 2023,
    rating: 8.3,
    language: "English",
    genre: "Biography, Drama, History",
    duration: "3h 00m",
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n8ua.jpg",
    cities: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Pune", "Hyderabad", "Kolkata", "Ahmedabad"],
    prices: {
      standard: 300,
      premium: 450,
      vip: 650
    }
  },
  {
    id: 10,
    title: "Salaar: Part 1 - Ceasefire",
    year: 2023,
    rating: 7.5,
    language: "Telugu",
    genre: "Action, Drama, Thriller",
    duration: "2h 55m",
    poster: "https://image.tmdb.org/t/p/w500/28er4p7B5zMSxUDQKPF1hAJcF1P.jpg",
    cities: ["Hyderabad", "Chennai", "Bangalore", "Mumbai", "Delhi", "Kolkata", "Vijayawada", "Vizag"],
    prices: {
      standard: 200,
      premium: 350,
      vip: 500
    }
  },
  {
    id: 11,
    title: "Leo",
    year: 2023,
    rating: 7.5,
    language: "Tamil",
    genre: "Action, Drama, Thriller",
    duration: "2h 44m",
    poster: "https://image.tmdb.org/t/p/w500/6Q1G2C1Fg2dkcQqiZkU6SjLKUrL.jpg",
    cities: ["Chennai", "Bangalore", "Hyderabad", "Mumbai", "Delhi", "Kochi", "Coimbatore", "Madurai"],
    prices: {
      standard: 200,
      premium: 350,
      vip: 500
    }
  },
  {
    id: 12,
    title: "12th Fail",
    year: 2023,
    rating: 9.1,
    language: "Hindi",
    genre: "Biography, Drama",
    duration: "2h 27m",
    poster: "https://image.tmdb.org/t/p/w500/8B7S1JuRfZiN9d5Y1jYfQlCbH0r.jpg",
    cities: ["Delhi", "Mumbai", "Bangalore", "Pune", "Lucknow", "Jaipur", "Bhopal", "Indore"],
    prices: {
      standard: 200,
      premium: 350,
      vip: 500
    }
  },
  {
    id: 13,
    title: "Spider-Man: Across the Spider-Verse",
    year: 2023,
    rating: 8.6,
    language: "English",
    genre: "Animation, Action, Adventure",
    duration: "2h 20m",
    poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    cities: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata", "Ahmedabad"],
    prices: {
      standard: 250,
      premium: 400,
      vip: 600
    }
  },
  {
    id: 14,
    title: "Kantara",
    year: 2022,
    rating: 8.3,
    language: "Kannada",
    genre: "Action, Drama, Fantasy",
    duration: "2h 28m",
    poster: "https://image.tmdb.org/t/p/w500/343Z7aj0txkGXqWMgJ6hfAGCWjH.jpg",
    cities: ["Bangalore", "Mumbai", "Chennai", "Hyderabad", "Delhi", "Mysuru", "Hubli", "Mangalore"],
    prices: {
      standard: 200,
      premium: 350,
      vip: 500
    }
  },
  {
    id: 15,
    title: "Drishyam 2",
    year: 2022,
    rating: 8.6,
    language: "Hindi",
    genre: "Crime, Drama, Mystery",
    duration: "2h 20m",
    poster: "https://image.tmdb.org/t/p/w500/1MxJ6fE7mhYMqDnEMPa4v9JNnw1.jpg",
    cities: ["Mumbai", "Delhi", "Ahmedabad", "Surat", "Jaipur", "Lucknow", "Bhopal", "Indore"],
    prices: {
      standard: 200,
      premium: 350,
      vip: 500
    }
  },
  {
    id: 16,
    title: "Dunki",
    year: 2023,
    rating: 7.2,
    language: "Hindi",
    genre: "Comedy, Drama",
    duration: "2h 40m",
    poster: "https://image.tmdb.org/t/p/w500/5d8Y4mZkmGVtq6XaZbfwT4VIT7m.jpg",
    cities: ["Mumbai", "Delhi", "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Amritsar"],
    prices: {
      standard: 250,
      premium: 400,
      vip: 600
    }
  },
  {
    id: 17,
    title: "Pushpa: The Rise",
    year: 2021,
    rating: 8.0,
    language: "Telugu",
    genre: "Action, Drama",
    duration: "2h 59m",
    poster: "https://image.tmdb.org/t/p/w500/vOl6qghXyGyaQKsHjXKqK8n0QJn.jpg",
    cities: ["Hyderabad", "Chennai", "Bangalore", "Mumbai", "Delhi", "Vizag", "Vijayawada", "Tirupati"],
    prices: {
      standard: 200,
      premium: 350,
      vip: 500
    }
  },
  {
    id: 18,
    title: "Barbie",
    year: 2023,
    rating: 7.0,
    language: "English",
    genre: "Adventure, Comedy, Fantasy",
    duration: "1h 54m",
    poster: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    cities: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata", "Ahmedabad"],
    prices: {
      standard: 250,
      premium: 400,
      vip: 600
    }
  },
  {
    id: 19,
    title: "Mission: Impossible - Dead Reckoning Part One",
    year: 2023,
    rating: 7.8,
    language: "English",
    genre: "Action, Adventure, Thriller",
    duration: "2h 43m",
    poster: "https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
    cities: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata", "Chandigarh"],
    prices: {
      standard: 300,
      premium: 450,
      vip: 650
    }
  },
  {
    id: 20,
    title: "Vikram Vedha",
    year: 2022,
    rating: 8.2,
    language: "Hindi",
    genre: "Action, Crime, Drama",
    duration: "2h 35m",
    poster: "https://image.tmdb.org/t/p/w500/2d4OHxp1Jq0r0Q9nN8wLZ0y9jUP.jpg",
    cities: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Lucknow", "Jaipur"],
    prices: {
      standard: 200,
      premium: 350,
      vip: 500
    }
  },
  {
    id: 21,
    title: "Ponniyin Selvan: I",
    year: 2022,
    rating: 7.8,
    language: "Tamil",
    genre: "Action, Adventure, Drama",
    duration: "2h 47m",
    poster: "https://image.tmdb.org/t/p/w500/8hB0SSM6tH8C9jfCbwj6y4y9Q5L.jpg",
    cities: ["Chennai", "Bangalore", "Hyderabad", "Mumbai", "Delhi", "Coimbatore", "Madurai", "Trichy"],
    prices: {
      standard: 200,
      premium: 350,
      vip: 500
    }
  },
  {
    id: 22,
    title: "The Super Mario Bros. Movie",
    year: 2023,
    rating: 7.1,
    language: "English",
    genre: "Animation, Adventure, Comedy",
    duration: "1h 32m",
    poster: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
    cities: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata", "Ahmedabad"],
    prices: {
      standard: 250,
      premium: 400,
      vip: 600
    }
  },
  {
    id: 23,
    title: "Brahmāstra: Part One – Shiva",
    year: 2022,
    rating: 5.4,
    language: "Hindi",
    genre: "Action, Adventure, Fantasy",
    duration: "2h 47m",
    poster: "https://image.tmdb.org/t/p/w500/4wHZ2f8p3o5zQyVr8h3qK7K0n5c.jpg",
    cities: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata", "Jaipur"],
    prices: {
      standard: 200,
      premium: 350,
      vip: 500
    }
  },
  {
    id: 24,
    title: "Black Panther: Wakanda Forever",
    year: 2022,
    rating: 6.7,
    language: "English",
    genre: "Action, Adventure, Drama",
    duration: "2h 41m",
    poster: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
    cities: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata", "Ahmedabad"],
    prices: {
      standard: 250,
      premium: 400,
      vip: 600
    }
  },
  {
    id: 25,
    title: "Thor: Love and Thunder",
    year: 2022,
    rating: 6.2,
    language: "English",
    genre: "Action, Adventure, Comedy",
    duration: "1h 59m",
    poster: "https://image.tmdb.org/t/p/w500/p1F51Lvj3sMopGczFzH5kQ4n0jK.jpg",
    cities: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata", "Chandigarh"],
    prices: {
      standard: 250,
      premium: 400,
      vip: 600
    }
  }
];

const indianCities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", 
  "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Coimbatore",
  "Mysuru", "Hubli", "Vijayawada", "Vizag", "Kochi", "Madurai",
  "Bhopal", "Indore", "Amritsar", "Surat", "Trichy", "Mangalore",
  "Tirupati"
];

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filters, setFilters] = useState({
    city: '',
    movieName: ''
  });
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Clear localStorage first to ensure fresh data
    localStorage.removeItem('movies');
    
    // Initialize data with fixed image URLs
    localStorage.setItem('movies', JSON.stringify(initialMovies));
    const storedMovies = initialMovies;
    
    setMovies(storedMovies);
    setFilteredMovies(storedMovies);
    setLoading(false);
    
    // Initialize cinemas data
    if (!localStorage.getItem('cinemas')) {
      const indianCinemas = [
        {
          id: "cinema1",
          name: "PVR Cinemas",
          location: "Phoenix Marketcity, Mumbai",
          movies: allMovieIds
        },
        {
          id: "cinema2",
          name: "INOX Leisure",
          location: "Select Citywalk, Delhi",
          movies: allMovieIds
        },
        {
          id: "cinema3",
          name: "Cinepolis",
          location: "Viviana Mall, Thane",
          movies: allMovieIds
        },
        {
          id: "cinema4",
          name: "Carnival Cinemas",
          location: "SM Street, Bangalore",
          movies: allMovieIds
        },
        {
          id: "cinema5",
          name: "Miraj Cinemas",
          location: "City Centre, Hyderabad",
          movies: allMovieIds
        },
        {
          id: "cinema6",
          name: "Asian Cinemas",
          location: "Forum Mall, Chennai",
          movies: allMovieIds
        },
        {
          id: "cinema7",
          name: "Wave Cinemas",
          location: "Noida, Delhi NCR",
          movies: allMovieIds
        },
        {
          id: "cinema8",
          name: "Fun Cinemas",
          location: "Koramangala, Bangalore",
          movies: allMovieIds
        }
      ];
      localStorage.setItem('cinemas', JSON.stringify(indianCinemas));
    }
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    
    // Start with all movies
    let filtered = [...movies];
    
    // City filter
    if (newFilters.city && newFilters.city.trim() !== '') {
      filtered = filtered.filter(movie => {
        // Check if movie has cities and if it includes the selected city
        const hasCity = movie.cities && 
                       Array.isArray(movie.cities) && 
                       movie.cities.some(city => 
                         city.toLowerCase() === newFilters.city.toLowerCase().trim()
                       );
        return hasCity;
      });
    }
    
    // Movie name filter
    if (newFilters.movieName && newFilters.movieName.trim() !== '') {
      const searchTerm = newFilters.movieName.toLowerCase().trim();
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm)
      );
    }
    
    setFilteredMovies(filtered);
  };

  const handleMovieClick = (movieId) => {
    navigate(`/cinemas/${movieId}`);
  };

  const clearFilters = () => {
    setFilters({ city: '', movieName: '' });
    setFilteredMovies(movies);
  };

  // Helper function to get starting price for a movie
  const getStartingPrice = (movie) => {
    if (!movie.prices) return "₹200";
    const prices = Object.values(movie.prices);
    return prices.length > 0 ? `From ₹${Math.min(...prices)}` : "₹200";
  };

  // Get all available ticket prices for a movie
  const getTicketPrices = (movie) => {
    if (!movie.prices) {
      return { standard: 200 };
    }
    return movie.prices;
  };

  // Improved image error handler
  const handleImageError = (e, movieTitle) => {
    e.target.onerror = null;
    e.target.src = 'https://via.placeholder.com/300x450?text=' + encodeURIComponent(movieTitle);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading movies...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>🎬 Now Showing</h1>
        <p>Book your favorite movies in just a few clicks</p>
      </div>
      
      <div className="filters-container">
        <div className="filters">
          <div className="filter-group">
            <label htmlFor="city">📍 Filter by Indian City</label>
            <select 
              id="city"
              name="city" 
              value={filters.city}
              onChange={handleFilterChange}
              className="form-input"
            >
              <option value="">All Indian Cities</option>
              {indianCities.map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="movieName">🔍 Search Movies</label>
            <input
              type="text"
              id="movieName"
              name="movieName"
              value={filters.movieName}
              onChange={handleFilterChange}
              placeholder="Enter movie name..."
              className="form-input"
            />
          </div>
          
          {(filters.city || filters.movieName) && (
            <div className="filter-group">
              <button 
                onClick={clearFilters}
                className="btn btn-outline"
                style={{ marginTop: '28px' }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
        
        {(filters.city || filters.movieName) && (
          <div className="active-filters">
            <span>Active filters: </span>
            {filters.city && <span className="filter-tag">📍 {filters.city}</span>}
            {filters.movieName && <span className="filter-tag">🔍 {filters.movieName}</span>}
          </div>
        )}
      </div>
      
      <div className="movies-container">
        <div className="results-count">
          Showing {filteredMovies.length} of {movies.length} movies
        </div>
        
        {filteredMovies.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🎬</div>
            <h3>No movies found</h3>
            <p>Try changing your filters</p>
            <button onClick={clearFilters} className="btn btn-primary mt-6">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="movies-grid">
            {filteredMovies.map(movie => {
              const ticketPrices = getTicketPrices(movie);
              
              return (
                <div 
                  key={movie.id} 
                  className="movie-card"
                  onClick={() => handleMovieClick(movie.id)}
                >
                  <div className="movie-poster">
                    <img 
                      src={movie.poster} 
                      alt={movie.title} 
                      onError={(e) => handleImageError(e, movie.title)}
                      loading="lazy"
                    />
                    <div className="movie-rating">
                      <span className="rating-badge">⭐ {movie.rating}/10</span>
                    </div>
                  </div>
                  
                  <div className="movie-content">
                    <h3 className="movie-title">{movie.title}</h3>
                    
                    <div className="movie-card-meta">
                      <div className="meta-item">
                        <span className="meta-label">Year:</span>
                        <span className="meta-value">{movie.year}</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">Language:</span>
                        <span className="meta-value">{movie.language}</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">Genre:</span>
                        <span className="meta-value">{movie.genre}</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">Duration:</span>
                        <span className="meta-value">{movie.duration}</span>
                      </div>
                    </div>
                    
                    <div className="movie-price">
                      <span className="price-label">🎟️ Ticket Prices:</span>
                      <div className="price-tags">
                        {ticketPrices.standard && (
                          <span className="price-tag">Standard: ₹{ticketPrices.standard}</span>
                        )}
                        {ticketPrices.premium && (
                          <span className="price-tag">Premium: ₹{ticketPrices.premium}</span>
                        )}
                        {ticketPrices.vip && (
                          <span className="price-tag">VIP: ₹{ticketPrices.vip}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="movie-cities">
                      <span className="cities-label">📍 Available in:</span>
                      <div className="city-tags">
                        {movie.cities && movie.cities.slice(0, 3).map((city, index) => (
                          <span key={index} className="city-tag">{city}</span>
                        ))}
                        {movie.cities && movie.cities.length > 3 && (
                          <span className="city-tag">+{movie.cities.length - 3} more</span>
                        )}
                        {(!movie.cities || movie.cities.length === 0) && (
                          <span className="city-tag">Multiple cities</span>
                        )}
                      </div>
                    </div>
                    
                    <button className="btn btn-primary btn-block">
                      🎟️ Book Tickets
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;