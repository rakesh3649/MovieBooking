import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CinemaList from './components/CinemaList';
import ShowTiming from './components/ShowTiming';
import BookingConfirmation from './components/BookingConfirmation';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/cinemas/:movieId" element={
                <ProtectedRoute>
                  <CinemaList />
                </ProtectedRoute>
              } />
              
              <Route path="/showtimes/:movieId/:cinemaId" element={
                <ProtectedRoute>
                  <ShowTiming />
                </ProtectedRoute>
              } />
              
              <Route path="/booking-confirmation" element={
                <ProtectedRoute>
                  <BookingConfirmation />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;