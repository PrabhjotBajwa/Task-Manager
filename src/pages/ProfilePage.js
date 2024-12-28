import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  useToast,
  Flex,
} from "@chakra-ui/react";
import ThemeToggle from "../components/ThemeToggle";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
  });

  const toast = useToast();

  // Load user details from local storage when the component mounts
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (storedProfile) {
      setProfile(storedProfile);
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Save updated details to local storage
  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    toast({
      title: "Profile Updated",
      description: "Your profile details have been successfully updated.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt={10}
      p={5}
      borderWidth={1}
      borderRadius="md"
      boxShadow="lg"
    >
      {/* Header with Theme Toggle */}
      <Flex justifyContent="space-between" alignItems="center" mb={5}>
        <Heading as="h2" size="lg">
          Profile Page
        </Heading>
        <ThemeToggle />
      </Flex>
      {/* Profile Form */}
      <VStack spacing={4}>
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </FormControl>
        <Button colorScheme="blue" width="full" onClick={handleSave}>
          Save Changes
        </Button>
      </VStack>
    </Box>
  );
};

export default ProfilePage;
