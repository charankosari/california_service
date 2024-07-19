import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import './Profile.css'; // Import CSS for styling

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
              <strong>Amount:</strong> {userData.amount}
            </div>
            <div className="profile-field">
              <strong>Address:</strong> {userData.addresses[0].address} {userData.addresses[0].pincode}
            </div>
            <button className="edit-button" onClick={handleEdit}>
              Edit
            </button>
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
                  <input name="address" value={formData.addresses} onChange={handleChange} placeholder="Address" />
                  <input name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" />
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
      </div>
    </>
  );
};

export default ProfilePage;
