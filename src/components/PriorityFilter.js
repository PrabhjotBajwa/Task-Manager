import React from 'react';
import { ButtonGroup, Button } from '@chakra-ui/react';
import useTaskStore from '../store/taskStore';

const PriorityFilter = () => {
  const { setFilter, currentFilter } = useTaskStore();

  return (
    <ButtonGroup>
      <Button
        onClick={() => setFilter('all')}
        colorScheme={currentFilter === 'all' ? 'blue' : 'gray'}
      >
        All
      </Button>
      <Button
        onClick={() => setFilter('high')}
        colorScheme={currentFilter === 'high' ? 'red' : 'gray'}
      >
        High Priority
      </Button>
      <Button
        onClick={() => setFilter('medium')}
        colorScheme={currentFilter === 'medium' ? 'yellow' : 'gray'}
      >
        Medium Priority
      </Button>
      <Button
        onClick={() => setFilter('low')}
        colorScheme={currentFilter === 'low' ? 'green' : 'gray'}
      >
        Low Priority
      </Button>
    </ButtonGroup>
  );
};

export default PriorityFilter;