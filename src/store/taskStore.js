import create from 'zustand';
import { persist } from 'zustand/middleware';

const useTaskStore = create(
  persist(
    (set, get) => ({
      tasks: [],
      currentFilter: 'all',
      addTask: (newTask) =>
        set((state) => ({
          tasks: [...state.tasks, { ...newTask, id: Date.now().toString() }],
        })),
      moveTask: (taskId, sourceStatus, destinationStatus) =>
        set((state) => {
          const taskIndex = state.tasks.findIndex((task) => task.id === taskId);
          const updatedTasks = [...state.tasks];
          updatedTasks[taskIndex] = {
            ...updatedTasks[taskIndex],
            status: destinationStatus,
          };
          return { tasks: updatedTasks };
        }),
      setFilter: (filter) => set({ currentFilter: filter }),
      getFilteredTasks: () => {
        const { tasks, currentFilter } = get();
        if (currentFilter === 'all') return tasks;
        return tasks.filter((task) => task.priority === currentFilter);
      },
      clearCompletedTasks: () =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.status !== 'done'),
        })),

      // Edit task - update title or other fields
      editTask: (taskId, updatedData) =>
        set((state) => {
          const updatedTasks = state.tasks.map((task) =>
            task.id === taskId ? { ...task, ...updatedData } : task
          );
          return { tasks: updatedTasks };
        }),

      // Delete task - remove task from the list
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),
    }),
    {
      name: 'task-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useTaskStore;
