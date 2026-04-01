import { useContext } from 'react';
import { StudyContext } from '../context/StudyContext';
import { generateId } from '../utils/helpers';

export const useTasks = () => {
  const { tasks, setTasks } = useContext(StudyContext);
  
  const addTask = (taskData) => {
    const newTask = { ...taskData, id: generateId(), status: 'Pending' };
    setTasks([...tasks, newTask]);
    return newTask;
  };

  const updateTask = (id, taskData) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, ...taskData } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const markTaskCompleted = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: 'Completed', completedAt: new Date().toISOString() } : t));
  };

  return { tasks, addTask, updateTask, deleteTask, markTaskCompleted };
};
