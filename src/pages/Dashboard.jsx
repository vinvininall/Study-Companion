import React from 'react';
import { motion } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import { useTasks } from '../hooks/useTasks';
import { useSubjects } from '../hooks/useSubjects';
import TaskCard from '../components/TaskCard';
import RevisionList from '../components/RevisionList';
import { FaGraduationCap } from 'react-icons/fa';

const Dashboard = () => {
  const { overallProgress, stats, subjectProgress } = useProgress();
  const { tasks, markTaskCompleted, deleteTask } = useTasks();
  const { topics } = useSubjects();

  const pendingTasks = tasks.filter(t => t.status === 'Pending').slice(0, 3);

  return (
    <motion.div 
      className="page-container dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <header className="page-header">
        <h1><FaGraduationCap /> Study Dashboard</h1>
        <p className="text-muted">Welcome back! Here's your current progress.</p>
      </header>

      <div className="stat-cards">
        <div className="stat-card">
          <h3>Overall Progress</h3>
          <div className="stat-value text-primary">{overallProgress}%</div>
        </div>
        <div className="stat-card">
          <h3>Completed Tasks</h3>
          <div className="stat-value text-success">{stats.completedTasks} / {stats.totalTasks}</div>
        </div>
        <div className="stat-card">
          <h3>Pending Tasks</h3>
          <div className="stat-value text-warning">{stats.pendingTasks}</div>
        </div>
        <div className="stat-card danger">
          <h3>Overdue Tasks</h3>
          <div className="stat-value text-danger">{stats.overdueTasks}</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card chart-section">
          <h2>Subject Progress</h2>
        </div>

        <div className="dashboard-sidebar">
          <div className="card section list-section">
            <h2>Upcoming Tasks</h2>
            <div className="task-list-sm">
              {pendingTasks.length > 0 ? (
                pendingTasks.map(task => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onComplete={markTaskCompleted} 
                    onDelete={deleteTask} 
                  />
                ))
              ) : (
                <div className="empty-state">No pending tasks!</div>
              )}
            </div>
          </div>
          <div className="card section list-section mt-4">
            <h2>Needs Revision</h2>
            <RevisionList topics={topics} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
