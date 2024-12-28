import React from 'react';
import { SimpleGrid, Button, VStack, useColorModeValue } from '@chakra-ui/react';
import TaskColumn from './TaskColumn';
import useTaskStore from '../store/taskStore';

const TaskBoard = () => {
  const { getFilteredTasks, clearCompletedTasks } = useTaskStore();
  const tasks = getFilteredTasks();
  const buttonBg = useColorModeValue("red.500", "red.300");

  const columns = ['todo', 'inProgress', 'done'];

  return (
    <VStack spacing={4}>
      <SimpleGrid columns={3} spacing={4} width="100%">
        {columns.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks.filter((task) => task.status === status)}
          />
        ))}
      </SimpleGrid>
      <Button colorScheme="red" onClick={clearCompletedTasks} bg={buttonBg}>
        Clear Completed Tasks
      </Button>
    </VStack>
  );
};

export default TaskBoard;