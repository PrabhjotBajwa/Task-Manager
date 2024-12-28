import React from 'react';
import { Box, Text, Flex, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Flex alignItems="center">
      <Text mr={3} fontWeight="medium" color={textColor}>
        {colorMode === 'light' ? 'Light Mode' : 'Dark Mode'}
      </Text>
      <Box
        as="button"
        aria-label="Toggle color mode"
        onClick={toggleColorMode}
        position="relative"
        w="50px"
        h="24px"
        borderRadius="full"
        bg={colorMode === 'light' ? 'gray.200' : 'gray.600'}
        transition="background-color 0.2s"
      >
        <motion.div
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: colorMode === 'light' ? 'white' : 'gray.200',
            position: 'absolute',
            top: '2px',
          }}
          animate={{
            left: colorMode === 'light' ? '2px' : '28px',
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        />
      </Box>
    </Flex>
  );
};

export default ThemeToggle;