import React from 'react';
import { Box, VStack, Heading, useColorModeValue } from '@chakra-ui/react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

const TaskColumn = ({ status, tasks }) => {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Box
      borderWidth={1}
      borderRadius="lg"
      p={4}
      bg={bgColor}
      borderColor={borderColor}
      transition="background-color 0.2s, border-color 0.2s"
    >
      <Heading size="md" mb={4} color={textColor}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Heading>
      <Droppable droppableId={status}>
        {(provided) => (
          <VStack
            spacing={4}
            align="stretch"
            minHeight="200px"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </VStack>
        )}
      </Droppable>
    </Box>
  );
};

export default TaskColumn;