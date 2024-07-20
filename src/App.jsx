import { Routes, Route } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import { useState } from 'react';
import Profile from './Profile';
import BookingsPage from './Booking';
const App = () => {
    const [login,setLogin] = useState(false)
    const handleLogin= ()=>{
        setLogin(!login)
    }
    return (
        <>
            <Container maxW='100%' px='6'>
                <Routes>
                    <Route path='/' element={<Login handleLogin={handleLogin}/>} />
                   
                     <Route path="/signup" element={<Signup login={login} handleLogin={handleLogin} />} />
                     <Route path='/profile' element={<Profile/>}/>
                     <Route path='/booking' element={<BookingsPage/>}/>
                </Routes>
            </Container>
        </>
    );
};

export default App;
