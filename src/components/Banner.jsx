import {
  HStack,
  VStack,
  Button,
  Text,
  Heading,
  Stack,
  Box,
  Image,
} from "@chakra-ui/react";
import { BiPlus } from "react-icons/bi";

import { bannerData } from "../data1";
import Apartment1Lg from "../assets/images/apartments/a1lg.png";
import Apartment6Lg from "../assets/images/apartments/a6lg.png";
import elec from '../assets/images/providers/electrician3.jpeg'
import paint from '../assets/images/providers/paint.jpeg'

const Banner = () => {
  return (
    <>
      <Stack direction="row" my='6' overflow='hidden'>
        <VStack
          flexGrow='1'
          px={{ sm: "6", md: "10" }}
          py={{ sm: '8',  md: "16" }}
          bg="blue.100"
          justify="center"
          align="left"
          borderRadius="xl"
        >
          <Heading fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}>
            Find The Service That You Want.
          </Heading>
          <Text fontSize="sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
            fugit illo? Delectus, voluptas unde quae cupiditate at amet beatae
            totam!
          </Text>
          <Box pt="3" pb="8">
            <Button>Get Started</Button>
          </Box>

          <HStack spacing="3">
            {bannerData.map((item, index) => (
              <VStack
                key={index}
                bg="blue.200"
                p="4"
                borderRadius="md"
                align="left"
                pr="3"
              >
                <HStack>
                  <Text fontSize={{sm: '14px', md: 'md'}} fontWeight="extrabold" mr="-2">
                    {Object.keys(item)}
                  </Text>{" "}
                  <BiPlus style={{ color: "#ED64A6" }} />
                </HStack>
                <Text fontSize={{sm: '12px', md: 'sm'}}>{Object.values(item)}</Text>
              </VStack>
            ))}
          </HStack>
        </VStack>

        <VStack justify='center'>
          
          <Box h='50%' display={{ base: "none", xl: "block" }}>
            <Image
              src={elec}
              alt="house"
              style={{height: '100%', width: '100%', objectFit: 'contain'}}
            />
          </Box>
          <Box h='50%' display={{ base: "none", xl: "block" }}>
            <Image
              src={paint}
              alt="house"
              style={{height: '400px', width: '100%', objectFit: 'contain'}}
            />
          </Box>
        </VStack>
      </Stack>
    </>
  );
};

export default Banner;
