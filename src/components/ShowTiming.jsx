import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ShowTiming = () => {
  const { movieId, cinemaId } = useParams();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState(null);
  const [cinema, setCinema] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState(2);
  const [selectedTicketType, setSelectedTicketType] = useState('standard');
  const [showTimes, setShowTimes] = useState([]);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  
  const timeSlots = ['10:00 AM', '1:30 PM', '4:00 PM', '7:30 PM', '10:00 PM'];
  const ticketTypes = [
    { id: 'standard', name: 'Standard', priceMultiplier: 1 },
    { id: 'premium', name: 'Premium', priceMultiplier: 1.6 },
    { id: 'vip', name: 'VIP', priceMultiplier: 2 }
  ];

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    const cinemas = JSON.parse(localStorage.getItem('cinemas')) || [];
    
    const selectedMovie = movies.find(m => m.id === parseInt(movieId));
    const selectedCinema = cinemas.find(c => c.id === cinemaId);
    
    if (!selectedMovie || !selectedCinema) {
      navigate('/');
      return;
    }
    
    setMovie(selectedMovie);
    setCinema(selectedCinema);
    
    // Generate show times for selected date
    const generatedShowTimes = timeSlots.map(time => ({
      time,
      seats: Math.floor(Math.random() * 20) + 10,
      basePrice: selectedMovie.prices?.standard || 200
    }));
    
    setShowTimes(generatedShowTimes);
    
    // Set initial price
    const basePrice = selectedMovie.prices?.standard || 200;
    setTicketPrice(basePrice);
    setTotalAmount(basePrice * selectedSeats);
  }, [movieId, cinemaId, navigate]);

  const getDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleSeatsChange = (e) => {
    const seats = parseInt(e.target.value);
    setSelectedSeats(seats);
    updateTotalAmount(seats, selectedTicketType);
  };

  const handleTicketTypeChange = (type) => {
    setSelectedTicketType(type);
    updateTotalAmount(selectedSeats, type);
  };

  const updateTotalAmount = (seats, ticketType) => {
    if (!movie) return;
    
    const ticketTypeObj = ticketTypes.find(t => t.id === ticketType);
    const basePrice = getBasePriceForTicketType(ticketType);
    const pricePerTicket = basePrice;
    
    setTicketPrice(pricePerTicket);
    setTotalAmount(pricePerTicket * seats);
  };

  const getBasePriceForTicketType = (ticketType) => {
    if (!movie) return 200;
    
    switch(ticketType) {
      case 'standard':
        return movie.prices?.standard || 200;
      case 'premium':
        return movie.prices?.premium || 320;
      case 'vip':
        return movie.prices?.vip || 400;
      default:
        return movie.prices?.standard || 200;
    }
  };

  const getTicketTypeName = (type) => {
    const ticket = ticketTypes.find(t => t.id === type);
    return ticket ? ticket.name : 'Standard';
  };

  const handleBookNow = () => {
    if (!selectedTime) {
      alert('Please select a show time');
      return;
    }

    const bookingDetails = {
      id: Date.now(),
      movieId: movie.id,
      movieTitle: movie.title,
      cinemaId: cinema.id,
      cinemaName: cinema.name,
      location: cinema.location,
      date: selectedDate.toLocaleDateString(),
      time: selectedTime,
      seats: selectedSeats,
      ticketType: selectedTicketType,
      ticketTypeName: getTicketTypeName(selectedTicketType),
      pricePerTicket: ticketPrice,
      totalPrice: totalAmount
    };

    // Save booking
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(bookingDetails);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // Save to user bookings if logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      const userBookings = JSON.parse(localStorage.getItem(`bookings_${currentUser.id}`)) || [];
      userBookings.push(bookingDetails);
      localStorage.setItem(`bookings_${currentUser.id}`, JSON.stringify(userBookings));
    }

    // Navigate to confirmation
    navigate('/booking-confirmation', {
      state: { bookingDetails }
    });
  };

  if (!movie || !cinema) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="show-timing">
      <div className="booking-header">
        <h1>🎟️ Book Tickets</h1>
        <div className="booking-info">
          <div className="info-card">
            <h3>Movie Details</h3>
            <p><strong>Title:</strong> {movie.title}</p>
            <p><strong>Cinema:</strong> {cinema.name}</p>
            <p><strong>Location:</strong> {cinema.location}</p>
            <div className="price-info">
              <p><strong>Ticket Prices:</strong></p>
              <div className="price-tags-small">
                {movie.prices?.standard && (
                  <span className="price-tag-small">Standard: ₹{movie.prices.standard}</span>
                )}
                {movie.prices?.premium && (
                  <span className="price-tag-small">Premium: ₹{movie.prices.premium}</span>
                )}
                {movie.prices?.vip && (
                  <span className="price-tag-small">VIP: ₹{movie.prices.vip}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="date-selection">
        <h2>📅 Select Date</h2>
        <div className="dates-grid">
          {getDates().map((date, index) => (
            <div
              key={index}
              className={`date-card ${selectedDate.toDateString() === date.toDateString() ? 'selected' : ''}`}
              onClick={() => handleDateSelect(date)}
            >
              <div className="date-day">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className="date-number">
                {date.getDate()}
              </div>
              <div className="date-month">
                {date.toLocaleDateString('en-US', { month: 'short' })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="time-selection">
        <h2>⏰ Select Show Time</h2>
        <p>Selected Date: {formatDate(selectedDate)}</p>
        
        <div className="time-slots">
          {showTimes.map((slot, index) => (
            <div
              key={index}
              className={`time-slot ${selectedTime === slot.time ? 'selected' : ''}`}
              onClick={() => handleTimeSelect(slot.time)}
            >
              <div className="time">{slot.time}</div>
              <div className="slot-info">
                <span className="seats">🎫 {slot.seats} seats left</span>
                <span className="price">₹{slot.basePrice}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTime && (
        <div className="ticket-selection">
          <h2>🎫 Select Tickets</h2>
          
          <div className="selection-grid">
            <div className="selection-group">
              <label htmlFor="ticketType">Ticket Type</label>
              <div className="ticket-type-buttons">
                {ticketTypes.map(type => (
                  <button
                    key={type.id}
                    className={`ticket-type-btn ${selectedTicketType === type.id ? 'selected' : ''}`}
                    onClick={() => handleTicketTypeChange(type.id)}
                  >
                    {type.name}
                    <span className="ticket-price">
                      ₹{getBasePriceForTicketType(type.id)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="selection-group">
              <label htmlFor="seats">Number of Seats</label>
              <div className="seats-selector">
                <button 
                  className="seat-btn"
                  onClick={() => {
                    if (selectedSeats > 1) {
                      handleSeatsChange({ target: { value: selectedSeats - 1 } });
                    }
                  }}
                >
                  −
                </button>
                <input
                  type="number"
                  id="seats"
                  min="1"
                  max="10"
                  value={selectedSeats}
                  onChange={handleSeatsChange}
                  className="seats-input"
                />
                <button 
                  className="seat-btn"
                  onClick={() => {
                    if (selectedSeats < 10) {
                      handleSeatsChange({ target: { value: selectedSeats + 1 } });
                    }
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTime && (
        <div className="booking-summary">
          <h3>✅ Booking Summary</h3>
          <div className="summary-card">
            <div className="summary-row">
              <span>Movie:</span>
              <span>{movie.title}</span>
            </div>
            <div className="summary-row">
              <span>Cinema:</span>
              <span>{cinema.name}</span>
            </div>
            <div className="summary-row">
              <span>Date & Time:</span>
              <span>{formatDate(selectedDate)} at {selectedTime}</span>
            </div>
            <div className="summary-row">
              <span>Ticket Type:</span>
              <span>{getTicketTypeName(selectedTicketType)}</span>
            </div>
            <div className="summary-row">
              <span>Number of Seats:</span>
              <span>{selectedSeats}</span>
            </div>
            <div className="summary-row">
              <span>Price per Ticket:</span>
              <span>₹{ticketPrice}</span>
            </div>
            <div className="summary-row total">
              <span>Total Amount:</span>
              <span>₹{totalAmount}</span>
            </div>
            
            <button 
              className="btn btn-primary btn-large"
              onClick={handleBookNow}
            >
              🎟️ Confirm Booking (₹{totalAmount})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowTiming;