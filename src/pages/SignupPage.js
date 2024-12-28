
import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Heading, useToast, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle'; 

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
      toast({
        title: 'Password mismatch',
        description: 'Passwords do not match. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Get all users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email already exists
    const userExists = existingUsers.find((user) => user.email === email);
    if (userExists) {
      toast({
        title: 'User already exists',
        description: 'An account with this email already exists.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Create new user and save to localStorage
    const newUser = { email, password };
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    toast({
      title: 'Signup successful',
      description: 'Your account has been created successfully.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    navigate('/login'); // Redirect to login page after signup
  };

  return (
    <Box maxW="sm" mx="auto" mt="10">
      {/* Add the ThemeToggle component here */}
      <Flex justifyContent="flex-end">
        <ThemeToggle />
      </Flex>
      <Heading as="h1" size="xl" mb={6}>Signup</Heading>
      <form onSubmit={handleSignup}>
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
        <FormControl mb={4}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </FormControl>
        <Button colorScheme="blue" type="submit">Signup</Button>
      </form>
    </Box>
  );
};

export default SignupPage;

