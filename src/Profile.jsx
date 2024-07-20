import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import './Profile.css'; // Import CSS for styling

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingSession, setIsAddingSession] = useState(false);
  const [formData, setFormData] = useState({});
  const [sessionData, setSessionData] = useState({ date: '', days: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const jwtToken = localStorage.getItem('token');
  const url = 'http://localhost:9999';

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${url}/api/c3/ser/me`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setUserData(response.data.ser);
        setFormData(response.data.ser);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [jwtToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await axios.put(`${url}/api/c3/ser/me`, formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setUserData(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsEditing(false);
    setIsAddingSession(false);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSessionChange = (e) => {
    const { name, value } = e.target;
    setSessionData({ ...sessionData, [name]: value });
  };

  const handleAddSessions = () => {
    setIsAddingSession(true);
  };

  const handleSubmitSession = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${url}/api/c3/ser/slots`, sessionData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setSuccessMessage('Session added successfully!');
      setSessionData({ date: '', days: '' });
    } catch (error) {
      console.error('Error adding session:', error);
      setErrorMessage('Error adding session.');
    } finally {
      setIsLoading(false);
      setIsAddingSession(false);
    }
  };

  if (isLoading) return <div className="loading-spinner"></div>;

  if (!userData) return <div className="loading-spinner"></div>;

  return (
    <>
      <Header />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-image">
            <img src={userData.image} alt={userData.name} />
          </div>
          <div className="profile-details">
            <div className="profile-field">
              <strong>Name:</strong> {userData.name}
            </div>
            <div className="profile-field">
              <strong>Email:</strong> {userData.email}
            </div>
            <div className="profile-field">
              <strong>Number:</strong> {userData.number}
            </div>
            <div className="profile-field">
              <strong>Description:</strong> {userData.description}
            </div>
            <div className="profile-field">
              <strong>Amount:</strong> ${userData.amount}
            </div>
            <div className="profile-field">
              <strong>Address:</strong> {userData.addresses[0].address}, {userData.addresses[0].pincode}
            </div>
            <div style={{display:'flex',flexDirection:'row',gap:'20px',justifyContent:'center'}}>
            <button className="edit-button" onClick={handleEdit}>
              Edit
            </button>
            <button className="add-sessions-button" onClick={handleAddSessions}>
              Add Sessions
            </button>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Edit Profile</h2>
              <form>
                <div className="modal-field">
                  <label>Email:</label>
                  <input name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="modal-field">
                  <label>Number:</label>
                  <input name="number" type="tel" value={formData.number} onChange={handleChange} />
                </div>
                <div className="modal-field">
                  <label>Description:</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} />
                </div>
                <div className="modal-field">
                  <label>Amount:</label>
                  <input name="amount" type="number" value={formData.amount} onChange={handleChange} />
                </div>
                <div className="modal-field">
                  <label>Address:</label>
                  <input name="address" value={formData.addresses[0].address} onChange={handleChange} placeholder="Address" />
                  <input name="pincode" value={formData.addresses[0].pincode} onChange={handleChange} placeholder="Pincode" />
                </div>
                <div className="modal-buttons">
                  <button type="button" onClick={handleSave} disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save'}
                  </button>
                  <button type="button" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isAddingSession && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Add Session</h2>
              <form>
                <div className="modal-field">
                  <label>Date:</label>
                  <input
                    type="date"
                    name="date"
                    value={sessionData.date}
                    onChange={handleSessionChange}
                  />
                </div>
                <div className="modal-field">
                  <label>Days:</label>
                  <input
                    type="number"
                    name="days"
                    value={sessionData.days}
                    onChange={handleSessionChange}
                  />
                </div>
                <div className="modal-buttons">
                  <button type="button" onClick={handleSubmitSession} disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Add'}
                  </button>
                  <button type="button" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
                {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
