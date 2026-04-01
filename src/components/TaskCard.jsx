import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { formatDate } from '../utils/helpers';

const TaskCard = ({ task, onComplete, onDelete }) => {
  const isCompleted = task.status === 'Completed';

  return (
    <motion.div 
      className={`task-card ${isCompleted ? 'completed' : ''} priority-${task.priority?.toLowerCase()}`}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <div className="task-left">
        <button className="status-toggle" onClick={() => !isCompleted && onComplete(task.id)}>
          {isCompleted ? <FaCheckCircle className="icon-success" /> : <FaRegCircle className="icon-pending" />}
        </button>
        <div className="task-info">
          <h4>{task.title}</h4>
          <span className="task-tags">
            {task.subject && <span className="tag subject-tag">{task.subject}</span>}
            {task.priority && <span className={`tag priority-tag ${task.priority.toLowerCase()}`}>{task.priority}</span>}
          </span>
        </div>
      </div>
      <div className="task-right">
        {task.deadline && <span className="task-deadline">{formatDate(task.deadline)}</span>}
        <button className="btn-danger-sm" onClick={() => onDelete(task.id)}>X</button>
      </div>
    </motion.div>
  );
};

export default TaskCard;
