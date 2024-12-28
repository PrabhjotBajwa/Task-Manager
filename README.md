# Task Management Application

## Overview
The Task Management Application is a React-based web application that allows users to create, organize, and track tasks using a drag-and-drop interface. It provides an intuitive way to manage tasks across different status categories.

## Features
- Create, edit, and delete tasks
- Drag-and-drop functionality to move tasks between status columns
- Persist tasks locally to maintain state across page reloads
- Filter tasks by priority
- Responsive design for use on various devices
- Dark mode toggle for comfortable viewing

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/PrabhjotBajwa/task-management-app.git
   ```
2. Navigate to the project directory:
   ```
   cd task-management-app
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage
1. Start the development server:
   ```
   npm start
   ```
2. Open your browser and visit `http://localhost:3000`
3. Create a new task by filling out the form and clicking "Add Task"
4. Drag and drop tasks between the "To Do", "In Progress", and "Done" columns
5. Edit or delete tasks using the buttons on each task card
6. Use the priority filter to view tasks of specific priorities
7. Toggle between light and dark modes using the switch in the header

## Technologies Used
- React.js
- react-beautiful-dnd for drag-and-drop functionality
- Local Storage for data persistence