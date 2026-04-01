import React from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '../utils/helpers';
import { FaCalendarCheck } from 'react-icons/fa';

const RevisionList = ({ topics }) => {
  // Topics that need revision
  const revisionTopics = topics.filter(t => t.status === 'Needs Revision');

  if (revisionTopics.length === 0) {
    return <div className="empty-state">No topics currently need revision. Great job!</div>;
  }

  return (
    <div className="revision-list">
      {revisionTopics.map(topic => (
        <motion.div 
          key={topic.id} 
          className="revision-item"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <FaCalendarCheck className="revision-icon" />
          <div className="revision-info">
            <h4>{topic.name}</h4>
            <p className="revision-date">Scheduled: {formatDate(topic.revisionDate || new Date())}</p>
          </div>
          <button className="btn-primary-sm">Start Revision</button>
        </motion.div>
      ))}
    </div>
  );
};

export default RevisionList;
