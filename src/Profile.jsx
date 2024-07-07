import React, { useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jwtToken = localStorage.getItem('jwtToken');
        if (!jwtToken) {
          throw new Error('JWT token not found in localStorage');
        }
        
        const response = await axios.get('https://california-server.onrender.com/api/c3/ser/me', {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        });
        setUserData(response.data.ser);
        setEditData(response.data.ser);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      await axios.put('https://california-server.onrender.com/api/c3/user/me/profileupdate', editData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
      setUserData(editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (!userData) {
    return <div className="loader"></div>
  }

  return (
    <section className="profile-section">
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-card-left">
            <img 
              src={userData.image}
              alt="Avatar" 
              className="profile-avatar" 
            />
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleChange}
                style={{ color: 'black' }}
              />
            ) : (
              <h1>{userData.name}</h1>
            )}
            <FaRegEdit fontSize={35} onClick={handleEditToggle} style={{ cursor: 'pointer' }} />
          </div>
          <div className="profile-card-body">
            <h6>Information</h6>
            <hr className="profile-hr" />
            <div className="profile-info">
              <div className="profile-info-item">
                <h6>Email</h6>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-muted">{userData.email}</p>
                )}
              </div>
              <div className="profile-info-item">
                <h6>Phone</h6>
                {isEditing ? (
                  <input
                    type="tel"
                    name="number"
                    value={editData.number}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-muted">{userData.number}</p>
                )}
              </div>
              <div className="profile-info-item">
                <h6>Service</h6>
                {isEditing ? (
                  <input
                    type="text"
                    name="service"
                    value={editData.service}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-muted">{userData.service}</p>
                )}
              </div>
              <div className="profile-info-item">
                <h6>Description</h6>
                {isEditing ? (
                  <textarea
                    name="description"
                    value={editData.description}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-muted">{userData.description}</p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="profile-actions">
                <button onClick={handleSave}>Save</button>
                <button onClick={handleEditToggle}>Cancel</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
