import React, { useState, useRef, useEffect } from 'react';
import { Box, Text, Badge, useColorModeValue, IconButton, Editable, EditableInput, EditablePreview } from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'; // Chakra UI's built-in Delete icon
import useTaskStore from '../store/taskStore';

const Task = ({ task, index }) => {
  const { editTask, deleteTask } = useTaskStore();
  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "white");
  const draggingBg = useColorModeValue("gray.100", "gray.600");

  const priorityColors = {
    low: {
      bg: useColorModeValue("green.100", "green.800"),
      text: useColorModeValue("green.800", "green.100"),
    },
    medium: {
      bg: useColorModeValue("yellow.100", "yellow.800"),
      text: useColorModeValue("yellow.800", "yellow.100"),
    },
    high: {
      bg: useColorModeValue("red.100", "red.800"),
      text: useColorModeValue("red.800", "red.100"),
    },
  };

  const [isEditing, setIsEditing] = useState(false);  // To toggle edit mode
  const [editedTitle, setEditedTitle] = useState(task.title);  // To store the edited title
  const editableRef = useRef(null); // Ref to access the EditableInput

  const handleSave = () => {
    if (editedTitle !== task.title) {
      editTask(task.id, { title: editedTitle });  // Update the task with new title
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTask(task.id);  // Delete the task
  };

  useEffect(() => {
    if (isEditing && editableRef.current) {
      editableRef.current.focus();
    }
  }, [isEditing]);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          borderWidth={1}
          borderRadius="md"
          p={2}
          mb={2}
          bg={snapshot.isDragging ? draggingBg : bgColor}
          boxShadow={snapshot.isDragging ? "lg" : "none"}
          borderColor={borderColor}
          transition="background-color 0.2s, border-color 0.2s"
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            {/* Editable component to edit task title */}
            <Editable
              value={editedTitle}
              isPreviewFocusable={false}
              isEditing={isEditing}
              onChange={(value) => setEditedTitle(value)}
            >
              <EditablePreview />
              <EditableInput ref={editableRef} /> {/* Add ref here to focus input */}
            </Editable>
            <Box>
              {/* Edit Button */}
              <IconButton
                icon={<EditIcon />}
                onClick={() => setIsEditing((prev) => !prev)} // Toggle edit state
                size="sm"
                variant="ghost"
                aria-label="Edit task"
              />
              {/* Delete Button */}
              <IconButton
                icon={<DeleteIcon />}
                onClick={handleDelete} // Delete task when clicked
                size="sm"
                variant="ghost"
                aria-label="Delete task"
                ml={2}
              />
            </Box>
          </Box>
          <Text fontWeight="bold" color={textColor} mb={2}>
            {/* Task Title will be editable */}
          </Text>
          <Badge
            bg={priorityColors[task.priority].bg}
            color={priorityColors[task.priority].text}
            px={2}
            py={1}
            borderRadius="md"
          >
            {task.priority.toUpperCase()}
          </Badge>

          {/* Save edited title */}
          {isEditing && (
            <Box mt={2} display="flex" justifyContent="flex-end">
              <IconButton
                icon={<EditIcon />}
                onClick={handleSave}
                size="sm"
                variant="solid"
                colorScheme="blue"
                aria-label="Save task"
              />
            </Box>
          )}
        </Box>
      )}
    </Draggable>
  );
};

export default Task;