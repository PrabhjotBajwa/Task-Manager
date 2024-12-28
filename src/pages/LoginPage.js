
import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Heading, useToast, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Get all users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email exists
    const user = existingUsers.find((user) => user.email === email);
    if (!user) {
      toast({
        title: 'User not found',
        description: 'No account found with this email.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Check if the password matches
    if (user.password !== password) {
      toast({
        title: 'Invalid password',
        description: 'Please check your password.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Store user in localStorage as logged-in user (could be used for redirecting)
    localStorage.setItem('user', JSON.stringify(user));

    toast({
      title: 'Login successful',
      description: 'Welcome back!',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    navigate('/');
  };

  return (
    <Box maxW="sm" mx="auto" mt="10">
      {/* Add the ThemeToggle component here */}
      <Flex justifyContent="flex-end">
        <ThemeToggle />
      </Flex>
      <Heading as="h1" size="xl" mb={6}>Login</Heading>
      <form onSubmit={handleLogin}>
        <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </FormControl>
        <Button colorScheme="blue" type="submit">Login</Button>
      </form>
    </Box>
  );
};

export default LoginPage;
