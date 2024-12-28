
import React, { useEffect } from 'react';
import { ChakraProvider, Box, VStack, Heading, Flex, useColorModeValue } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskForm from './components/TaskForm';
import TaskBoard from './components/TaskBoard';
import PriorityFilter from './components/PriorityFilter';
import ThemeToggle from './components/ThemeToggle';
import useTaskStore from './store/taskStore';
import theme from './theme';
import './App.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';

function AppContent() {
  const { moveTask } = useTaskStore();
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    moveTask(result.draggableId, source.droppableId, destination.droppableId);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box className="app-container" bg={bgColor} color={textColor} minHeight="100vh" p={4} transition="background-color 0.2s">
        <VStack spacing={6} align="stretch">
          <Flex justifyContent="space-between" alignItems="center" wrap="wrap">
            <Heading as="h1" size="2xl">
              Task Management App
            </Heading>
            <ThemeToggle />
          </Flex>
          <TaskForm />
          <PriorityFilter />
          <TaskBoard />
        </VStack>
      </Box>
    </DragDropContext>
  );
}

function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  return <AppContent />;
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profilepage" element={<ProfilePage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;