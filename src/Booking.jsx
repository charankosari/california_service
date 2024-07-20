import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import './Booking.css'; // Import CSS for styling

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const jwtToken = localStorage.getItem('token');
  const url = 'http://localhost:9999';

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${url}/api/c3/ser/getbookings`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setBookings(response.data.bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [jwtToken]);

  if (isLoading) return <div className="loading-spinner"></div>;

  return (
    <>
      <Header />
      <div className="bookings-container">
        <h1>Booking Details</h1>
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <div className="booking-header">
                <h2>{booking.name}</h2>
                <span>Booking ID: {booking.bookingId}</span>
              </div>
              <div className="booking-details">
                <p><strong>Email:</strong> {booking.email}</p>
                <p><strong>Phone Number:</strong> {booking.phonenumber}</p>
                <p><strong>Amount Paid:</strong> ${booking.amountpaid}</p>
                <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
              </div>
              <div className="booking-footer">
                <p><strong>User:</strong> {booking.user.name}</p>
                <p><strong>User Email:</strong> {booking.user.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingsPage;
