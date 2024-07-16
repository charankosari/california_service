import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = ({ login }) => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState("");
  const url = "http://localhost:9999";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");
        if (!jwtToken) {
          throw new Error("JWT token not found in localStorage");
        }

        const response = await axios.get(`${url}/api/c3/ser/me`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setUserData(response.data.ser);
        setEditData(response.data.ser);
        setAvatarUrl(response.data.ser.image || "");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
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
      const jwtToken = localStorage.getItem("jwtToken");

      const updatedData = {};

      if (editData.name !== userData.name) {
        updatedData.name = editData.name;
      }
      if (editData.email !== userData.email) {
        updatedData.email = editData.email;
      }
      if (editData.number !== userData.number) {
        updatedData.number = editData.number;
      }
      if (
        editData.address !== userData.address ||
        editData.pincode !== userData.pincode
      ) {
        updatedData.address = {
          address: editData.address,
          pincode: editData.pincode,
        };
      }
      await axios.put(`${url}/api/c3/ser/me/profileupdate`, updatedData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      setUserData({ ...userData, ...updatedData });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const generateRandomAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    setAvatarUrl(`https://api.multiavatar.com/${randomSeed}.svg`);
  };

  const handleSignout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!userData) {
    return <h2>No user data available</h2>;
  }

  return (
    <>
    <div className="profile-container">
      <div className="profile-card">
        <button className="edit-icon" onClick={handleEditToggle}>
          Edit
        </button>
        <img
          src={
            avatarUrl ||
            userData.avatar ||
            "https://api.multiavatar.com/Binx Bond.svg"
          }
          alt="Avatar"
          className="profile-avatar"
          onClick={generateRandomAvatar}
        />
        {isEditing ? (
          <input
            name="name"
            value={editData.name}
            onChange={handleChange}
            className="profile-input"
          />
        ) : (
          <h3>{userData.name}</h3>
        )}
        <div className="profile-info">
          <hr />
          {isEditing ? (
            <>
              <input
                name="email"
                value={editData.email}
                onChange={handleChange}
                 placeholder="enter the Email"
                className="profile-input"
              />
              <input
                name="number"
                value={editData.number}
                onChange={handleChange}
                  placeholder="enter the Mobile Number"
                className="profile-input"
              />
              <input
                name="address"
                value={editData.address}
                onChange={handleChange}
                placeholder="enter the Address"
                className="profile-input"
              />
              <input
                name="pincode"
                value={editData.pincode}
                onChange={handleChange}
                  placeholder="enter the Zipcode"
                className="profile-input"
              />
              <input
                name="price"
                value={editData.price}
                className="profile-input"
                placeholder="enter the Price"
              />
            </>
          ) : (
            <>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Phone:</strong> {userData.number}
              </p>
              <p>
                <strong>Address:</strong> {userData.addresses[0].address}
              </p>
              <p>
                <strong>Zipcode:</strong> {userData.addresses[0].pincode}
              </p>
            </>
          )}
          {isEditing && (
            <div className="edit-buttons">
              <button onClick={handleSave}>Save</button>
              <button onClick={handleEditToggle}>Cancel</button>
            </div>
          )}
        </div>
      
      </div>
    
    </div>
      <button className="signout-button" onClick={handleSignout}>
      Sign Out
    </button>
    </>
  );
};

export default Profile;
