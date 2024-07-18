import { Routes, Route } from 'react-router-dom';
import { Container } from '@chakra-ui/react';

import Header from './components/Header/Header';
import Home from './routes/Home';
import ServiceDetails from './routes/ServiceDetails';
import Footer from './components/Footer';
import ServiceProvider from './context/ServiceContext';
import ServiceDetail from './components/PropertyDetails/ServiceDetail';
import BookingConfirmation from './BookingConfirmation';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import { useState } from 'react';
import Profile from './Profile';
import Chat from './Chat';
import BookingList from './components/bookings/BookingList';

const App = () => {
    const [login,setLogin] = useState(false)
    const handleLogin= ()=>{
        setLogin(!login)
    }
    return (
        <ServiceProvider>
            <Container maxW='100%' px='6'>
                <Header login={login} handleLogin={handleLogin}/>
                <Routes>
                    <Route path='/' element={<Login handleLogin={handleLogin}/>} />
                   
                     <Route path="/signup" element={<Signup login={login} handleLogin={handleLogin} />} />
                     <Route path='/profile' element={<Profile/>}/>
                     <Route path='/booking' element={<BookingList/>}/>


                     

                </Routes>
            </Container>
            <Footer />
        </ServiceProvider>
    );
};

export default App;
