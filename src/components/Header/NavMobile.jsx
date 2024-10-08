import { useRef } from 'react';

import { ButtonGroup, VStack, Input, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Button, IconButton, useDisclosure, Center } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
const NavMobile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  
  return (
    <>
        <IconButton variant='ghost' 
            icon={<FiMenu fontSize='1.35rem' />}
            aria-label='Open Menu'
            onClick={onOpen} ref={btnRef}
        />
        <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <Center>
                <DrawerHeader>Menu</DrawerHeader>
                </Center>
                <DrawerBody px='14' mt='4'>
                    <VStack as='nav' spacing='8' alignItems='left'>
                    <Link to='/booking'>
                  <Button size='sm' variant='solid'>My Booking</Button>
                </Link>
                    </VStack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </>
  )
}

export default NavMobile