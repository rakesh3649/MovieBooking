import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (!location.state?.bookingDetails) {
      navigate('/');
      return;
    }
    
    setBooking(location.state.bookingDetails);
    
    // Update user's bookings
    if (currentUser) {
      const userBookings = JSON.parse(localStorage.getItem(`bookings_${currentUser.id}`)) || [];
      userBookings.push(location.state.bookingDetails);
      localStorage.setItem(`bookings_${currentUser.id}`, JSON.stringify(userBookings));
    }
  }, [location, navigate, currentUser]);

  if (!booking) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Processing your booking...</p>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        <div className="confirmation-header">
          <div className="success-icon">
            <span>✅</span>
          </div>
          <h1>🎉 Booking Confirmed!</h1>
          <p className="confirmation-message">
            Your ticket has been successfully booked.
          </p>
        </div>

        <div className="confirmation-details">
          <div className="details-section">
            <h2>📋 Booking Details</h2>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Booking ID:</span>
                <span className="detail-value">{booking.id}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Movie:</span>
                <span className="detail-value">{booking.movieTitle}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Cinema:</span>
                <span className="detail-value">{booking.cinemaName}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{booking.location}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{booking.date}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Time:</span>
                <span className="detail-value">{booking.time}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Ticket Type:</span>
                <span className="detail-value">{booking.ticketTypeName || 'Standard'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Seats:</span>
                <span className="detail-value">{booking.seats} tickets</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Price per Ticket:</span>
                <span className="detail-value">₹{booking.pricePerTicket || booking.price / booking.seats}</span>
              </div>
              <div className="detail-item total-item">
                <span className="detail-label">Total Amount Paid:</span>
                <span className="detail-value total-price">₹{booking.totalPrice || booking.price}</span>
              </div>
            </div>
          </div>

          {currentUser && (
            <div className="user-details">
              <h2>👤 User Information</h2>
              <div className="user-info">
                <p><strong>Name:</strong> {currentUser.name}</p>
                <p><strong>Email:</strong> {currentUser.email}</p>
              </div>
            </div>
          )}

          <div className="ticket-note">
            <h3>📝 Important Information</h3>
            <ul>
              <li>Please arrive at the cinema at least 30 minutes before the show</li>
              <li>Carry a valid ID proof along with this booking confirmation</li>
              <li>Tickets are non-refundable and non-transferable</li>
              <li>Seats will be allocated on a first-come-first-serve basis</li>
              <li>Present this booking confirmation or QR code at the counter</li>
            </ul>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/" className="btn btn-primary">
            🏠 Back to Home
          </Link>
          <button 
            className="btn btn-secondary"
            onClick={() => window.print()}
          >
            🖨️ Print Ticket
          </button>
          <button 
            className="btn btn-outline"
            onClick={() => alert('Email feature coming soon!')}
          >
            📧 Email Ticket
          </button>
        </div>

        <div className="qr-section">
          <h3>📱 Digital Ticket</h3>
          <div className="qr-placeholder">
            <div className="qr-code">
              <div className="qr-lines"></div>
              <div className="qr-lines"></div>
              <div className="qr-lines"></div>
            </div>
            <div className="ticket-barcode">
              <div className="barcode-lines"></div>
            </div>
            <p>Booking ID: <strong>{booking.id}</strong></p>
            <p>Scan this QR code at the cinema entrance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;