import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [cp,setCp]=useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    number: '',
    addresses: {
      address: '',
      pincode: '',
    },
    amount: '',
    image: '',
    date: '',
    days: '',
    service: '',
    description: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const url = 'https://oneapp.trivedagroup.com';

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'address' || name === 'pincode') {
      setFormData({
        ...formData,
        addresses: {
          ...formData.addresses,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if(cp!==formData.password){
      alert('Password and confirm password should be same.');
      return;
    }
    const isFormValid = validateFirstStep();
    if (isFormValid) {
      setCurrentStep(2);
    } else {
      alert('Please fill all required fields on the first page.');
    }
  };

  const validateFirstStep = () => {
    const { name, email, password, number, addresses } = formData;
    return (
      name &&
      email &&
      password.length >= 8 && 
      number &&
      addresses.address &&
      addresses.pincode 
    );
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if(cp!==formData.password){
      alert('Password and confirm password should be same');
      setIsLoading(false);
      return
    }
    try {
      await axios.post(`${url}/api/c3/ser/register`, formData);
      navigate('/'); // Redirect on success
    } catch (error) {
      console.error('Signup error:', error);
      alert(error.response.data.error); // Show the error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container" style={{ marginTop: '2vh' }}>
      <div className="auth-card">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={currentStep === 2 ? handleSubmit : handleNext} className="auth-form">
          {currentStep === 1 && (
            <>
              <div className="input-container">
                <input
                  type="text"
                  name="name"
                  placeholder=" "
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <label>Name</label>
              </div>
              <div className="input-container">
                <input
                  type="email"
                  name="email"
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label>Email</label>
              </div>
              <div className="input-container">
                <input
                  type="password"
                  name="password"
                  placeholder=" "
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              <label>Password (at least 8 characters)</label>
              </div>
              <div className="input-container">
                <input
                  type="password"
                  name="password"
                  placeholder=" "
                  value={cp}
                  onChange={(e)=>{setCp(e.target.value)}}
                  required
                />
              <label>Confirm Password</label>
              </div>
              <div className="input-container">
                <input
                  type="tel"
                  name="number"
                  placeholder=" "
                  value={formData.number}
                  onChange={handleChange}
                  required
                />

                <label>Phone Number</label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  name="address"
                  placeholder=" "
                  value={formData.addresses.address}
                  onChange={handleChange}
                  required
                />
                <label>Address</label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  name="pincode"
                  placeholder=" "
                  value={formData.addresses.pincode}
                  onChange={handleChange}
                  required
                />
                <label>Pincode</label>
              </div>
              <button type="submit" onClick={handleNext} disabled={!validateFirstStep()}>
                Next
              </button>
            </>
          )}
          {currentStep === 2 && (
            <>
              <div className="input-container">
                <input
                  type="number"
                  name="amount"
                  placeholder=" "
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
                <label>Amount</label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  name="image"
                  placeholder=" "
                  value={formData.image}
                  onChange={handleChange}
                  required
                />
                <label>Image URL</label>
              </div>
              <div className="input-container">
                <input
                  type="date"
                  name="date"
                  placeholder=" "
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
                <label>Date</label>
              </div>
              <div className="input-container">
                <input
                  type="number"
                  name="days"
                  placeholder=" "
                  value={formData.days}
                  onChange={handleChange}
                  required
                />
                <label>Days</label>
              </div>
              <div className="input-container" style={{border:'#ccc 1px solid',padding:'10px',marginBottom:'10px'}}>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  style={{marginLeft:'100px'}}
                >
                  <option value="" disabled>Select Service Type</option>
                  <option value="air conditioner repair">Air Conditioner Repair</option>
                  <option value="landscaping">Landscaping</option>
                  <option value="electricians">Electricians</option>
                  <option value="home cleaners">Home Cleaners</option>
                  <option value="plumbers">Plumbers</option>
                </select>
                <label>Service Type</label>
              </div>
              <div className="input-container">
                <textarea
                  name="description"
                  placeholder=" "
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
                <label>Service Description</label>
              </div>
              <button type="button" onClick={handlePrevious}>Back</button>
              <button type="submit" disabled={isLoading}>
                {isLoading ? <span className="loader"></span> : 'Signup'}
              </button>
            </>
          )}
        </form>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
