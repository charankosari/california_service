import { Flex, Heading, Button, HStack, chakra, ButtonGroup, useBreakpointValue } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import NavMobile from './NavMobile';
import { CgProfile } from "react-icons/cg";
import { useEffect } from 'react';

const Header = ({ login, setLogin }) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const navigate = useNavigate();

  // Check if the user is logged in on component mount
  

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    handleLogin()
    navigate('/login');
  };

  return (
    <chakra.header id="header" borderBottom='1px solid rgb(0,0,0,0.3)'>
      <Flex w='100%' py='5' align='center' justify='space-between'>
        <Link to='/'>
          <Heading fontSize='3xl' color='blue.700'>Estatery.</Heading>
        </Link>
        {
          isDesktop ? (
            <>
              <ButtonGroup as='nav' variant='link' spacing='5'>
                {
                  ['Home', 'Features', 'About Us'].map((item) => (
                    <Button fontSize='16px' key={item}>{item}</Button>
                  ))
                }
              </ButtonGroup>

              <HStack>
                <Button size='sm' variant='solid'>Contact</Button>
                {login ? (
                  <>
                  <Link to='/profile'>  <CgProfile fontSize={40} style={{ marginLeft: '20px' }} /></Link>
                    <Button size='sm' variant='outline' onClick={handleLogout}>Logout</Button>
                  </>
                ) : (
                  <Button size='sm' variant='outline'><Link to='/login'>Sign in</Link></Button>
                )}
              </HStack>
            </>
          ) : (
            <NavMobile />
          )
        }
      </Flex>
    </chakra.header>
  );
};

export default Header;
