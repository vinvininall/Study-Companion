import React from 'react';
import { motion } from 'framer-motion';

const SubjectCard = ({ subject, onEdit, onDelete }) => {
  return (
    <motion.div 
      className="subject-card"
      whileHover={{ scale: 1.02 }}
      style={{ borderTop: `4px solid ${subject.color || '#8884d8'}` }}
    >
      <div className="subject-header">
        <h3>{subject.name}</h3>
      </div>
      <p className="subject-desc">{subject.description}</p>
      <div className="subject-actions">
        <button className="btn-secondary" onClick={() => onEdit(subject)}>Edit</button>
        <button className="btn-danger" onClick={() => onDelete(subject.id)}>Delete</button>
      </div>
    </motion.div>
  );
};

export default SubjectCard;
