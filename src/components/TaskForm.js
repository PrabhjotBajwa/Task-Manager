import React, { useState } from 'react';
import { Box, Input, Button, Select, VStack, useColorModeValue } from '@chakra-ui/react';
import useTaskStore from '../store/taskStore';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const addTask = useTaskStore((state) => state.addTask);
  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title, priority, status: 'todo' });
    setTitle('');
    setPriority('medium');
  };

  return (
    <Box as="form" onSubmit={handleSubmit} bg={bgColor} p={4} borderRadius="md" borderWidth={1} borderColor={borderColor}>
      <VStack spacing={4}>
        <Input
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </Select>
        <Button type="submit" colorScheme="blue">
          Add Task
        </Button>
      </VStack>
    </Box>
  );
};

export default TaskForm;