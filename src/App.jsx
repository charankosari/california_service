import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Profile from './Profile';
import BookingsPage from './Booking';
import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [login, setLogin] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const jwtToken = localStorage.getItem('token');
    const url = 'https://oneapp.trivedagroup.com';

    const handleLogin = () => {
        setLogin(!login);
    };

    const fetchUserRole = async () => {
        try {
            const response = await axios.get(`${url}/api/c3/ser/me`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            const role = response.data.ser.role;
            setUserRole(role);
            if (role === 'disabled') {
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error('Error fetching user role:', error);
        }
    };

    useEffect(() => {
        if (jwtToken) {
            fetchUserRole();
        }
    }, [jwtToken]);

    return (
        <>
            <Container maxW='100%' px='6'>
                <Routes>
                    <Route path='/' element={<Login handleLogin={handleLogin} />} />
                    <Route path="/signup" element={<Signup login={login} handleLogin={handleLogin} />} />
                    {userRole === 'disabled' ? (
                        <Route path='*' element={<DisabledModal />} />
                    ) : (
                        <>
                            <Route path='/profile' element={<Profile />} />
                            <Route path='/booking' element={<BookingsPage />} />
                        </>
                    )}
                </Routes>
            </Container>
            {isModalOpen && <DisabledModal />}
        </>
    );
};

// Modal component to display when the account is disabled
const DisabledModal = () => {
    return (
        <div className="disabled-modal-overlay">
            <div className="disabled-modal">
                <h2>Your account is disabled</h2>
                <p>Please contact the admin to enable your account.</p>
            </div>
        </div>
    );
};

export default App;
