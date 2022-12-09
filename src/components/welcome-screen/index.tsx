import React from 'react';
import NavBar from '@/src/components/navbar';
import { Box, Image, Flex, Text } from '@chakra-ui/react';

const WelcomeScreen = (): JSX.Element => {
  return (
    <>
      <Box bgGradient="linear(darkblue, white)" height="100vh">
        <NavBar />
        <Flex
          alignItems="center"
          flexDirection={['column', 'column', 'row', 'row']}
          justifyContent="center"
          p="4rem">
          <Box>
            <Text fontSize={['40px', '40px', '50px', '50px']} fontWeight="bold" lineHeight="50px">
              INE PM helps teams move work forward.
            </Text>
            <Text
              fontSize={['1rem', '1rem', '1.5rem', '1.5rem']}
              width={['100%', '100%', '50%', '50%']}>
              INE PM is the ultimate project management tool. Start up a board in seconds, automate
              tedious tasks, and collaborate anywhere, even on mobile.
            </Text>
          </Box>
          <Box>
            <Image
              height={['200px', '300px', '400px', '500px']}
              src="/homepage/home-illustration.svg"
              alt="brand logo"></Image>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default WelcomeScreen;
