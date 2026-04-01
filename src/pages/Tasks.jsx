import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { useTasks } from '../hooks/useTasks';
import { useSubjects } from '../hooks/useSubjects';
import TaskCard from '../components/TaskCard';
import SearchBar from '../components/SearchBar';
import { FaTasks } from 'react-icons/fa';
import { toast } from 'react-toastify';

const taskSchema = yup.object().shape({
  title: yup.string().required('Required'),
  subjectId: yup.string().required('Required'),
  topicId: yup.string().required('Required'),
  deadline: yup.string().required('Required'),
  priority: yup.string().required('Required')
});

const Tasks = () => {
  const { tasks, addTask, updateTask, deleteTask, markTaskCompleted } = useTasks();
  const { subjects, topics } = useSubjects();
  
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({ resolver: yupResolver(taskSchema) });

  const selectedSubjectId = watch('subjectId');
  const filteredTopics = topics.filter(t => t.subjectId === selectedSubjectId);

  const onSubmit = (data) => {
    addTask({
      ...data,
      subject: subjects.find(s => s.id === data.subjectId)?.name,
      topic: topics.find(t => t.id === data.topicId)?.name,
    });
    reset();
    toast.success("Task added!");
  };

  const getFilteredTasks = () => {
    let filtered = tasks;
    
    // Tab filter
    if (activeTab === 'Pending') filtered = filtered.filter(t => t.status === 'Pending');
    if (activeTab === 'Completed') filtered = filtered.filter(t => t.status === 'Completed');
    if (activeTab === 'Revision') filtered = filtered.filter(t => t.status === 'Revision');
    if (activeTab === 'Overdue') {
      filtered = filtered.filter(t => t.status !== 'Completed' && new Date(t.deadline) < new Date());
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                       (t.subject && t.subject.toLowerCase().includes(searchQuery.toLowerCase())));
    }

    return filtered;
  };

  return (
    <motion.div className="page-container" initial={{opacity:0}} animate={{opacity:1}}>
      <header className="page-header">
        <h1><FaTasks /> Tasks</h1>
        <p className="text-muted">Manage and prioritize your study tasks.</p>
      </header>

      <div className="grid-2col">
        <div className="column">
          <div className="card">
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="form-group">
              <input type="text" placeholder="Task Title (e.g., Solve 10 problems)" {...register('title')} />
              <select {...register('subjectId')}>
                <option value="">Select Subject...</option>
                {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <select {...register('topicId')}>
                <option value="">Select Topic...</option>
                {filteredTopics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
              <input type="date" {...register('deadline')} />
              <select {...register('priority')}>
                <option value="Low">Low</option>
                <option value="Medium" defaultValue>Medium</option>
                <option value="High">High</option>
              </select>
              <button type="submit" className="btn-primary">Add Task</button>
            </form>
          </div>
        </div>

        <div className="column">
          <SearchBar onSearch={setSearchQuery} placeholder="Search tasks..." />
          
          <div className="tabs mt-4">
            {['All', 'Pending', 'Completed', 'Overdue', 'Revision'].map(tab => (
              <button 
                key={tab} 
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="task-list mt-4">
            {getFilteredTasks().length > 0 ? getFilteredTasks().map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onComplete={markTaskCompleted} 
                onDelete={deleteTask} 
              />
            )) : (
              <div className="empty-state">No tasks found.</div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Tasks;
