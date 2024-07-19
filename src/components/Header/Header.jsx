import { Flex, Heading, Button, HStack, chakra, ButtonGroup, useBreakpointValue } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import NavMobile from './NavMobile';
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from 'react';
import logo from '../../assets/images/logo.png'

const Header = ({ handleLogin }) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLogin(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLogin(false);
    navigate('/');
  };

  return (
    <chakra.header id="header" borderBottom='1px solid rgb(0,0,0,0.3)'>
      <Flex w='100%' py='5' align='center' justify='space-between'>
        <Link to='/'>
          <Heading fontSize='xl' color={'#fff'} >
            <img src={logo} alt="" style={{ height: '60px' }} />
          </Heading>
        </Link>
        {
          isDesktop ? (
            <>


              <HStack>
                <Link to='/booking'>
                  <Button size='sm' variant='solid'>My Booking</Button>
                </Link>
                {login ? (
                  <>
                    <Link to='/profile'>
                      <CgProfile fontSize={40} style={{ marginLeft: '20px' }} />
                    </Link>
                    <Button size='sm' variant='outline' onClick={handleLogout}>Logout</Button>
                  </>
                ) : (
                  <Button size='sm' variant='outline'>
                    <Link to='/login'>Sign in</Link>
                  </Button>
                )}
              </HStack>
            </>
          ) : (
            <Link to='/booking'>
            <Button size='sm' variant='solid'>My Booking</Button>
          </Link>
          )
        }
      </Flex>
    </chakra.header>
  );
};

export default Header;
