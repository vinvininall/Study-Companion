import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { useSubjects } from '../hooks/useSubjects';
import SubjectCard from '../components/SubjectCard';
import { FaBookReader } from 'react-icons/fa';
import { toast } from 'react-toastify';

const subjectSchema = yup.object().shape({
  name: yup.string().required('Required'),
  description: yup.string(),
  color: yup.string().required('Required')
});

const topicSchema = yup.object().shape({
  subjectId: yup.string().required('Required'),
  name: yup.string().required('Required'),
  difficulty: yup.string().required('Required'),
  notes: yup.string()
});

const Subjects = () => {
  const { subjects, topics, addSubject, deleteSubject, addTopic, deleteTopic, updateTopic } = useSubjects();
  const [viewingSubject, setViewingSubject] = useState(null);

  const { register: regSub, handleSubmit: handleSub, reset: resetSub } = useForm({ resolver: yupResolver(subjectSchema) });
  const { register: regTop, handleSubmit: handleTop, reset: resetTop } = useForm({ resolver: yupResolver(topicSchema) });

  const onSubjectSubmit = (data) => {
    addSubject(data);
    resetSub();
    toast.success("Subject added!");
  };

  const onTopicSubmit = (data) => {
    addTopic(data);
    resetTop();
    toast.success("Topic added!");
  };

  return (
    <motion.div className="page-container" initial={{opacity:0}} animate={{opacity:1}}>
      <header className="page-header">
        <h1><FaBookReader /> Subjects & Topics</h1>
        <p className="text-muted">Organize your study curriculum.</p>
      </header>

      <div className="grid-2col">
        {/* Subjects Column */}
        <div className="column">
          <div className="card">
            <h2>Add Subject</h2>
            <form onSubmit={handleSub(onSubjectSubmit)} className="form-group">
              <input type="text" placeholder="Algorithm Design" {...regSub('name')} />
              <input type="text" placeholder="Short description" {...regSub('description')} />
              <div className="color-wrap">
                <label>Label Color:</label>
                <input type="color" {...regSub('color')} defaultValue="#6366f1" className="color-picker" />
              </div>
              <button type="submit" className="btn-primary">Add Subject</button>
            </form>
          </div>

          <div className="subject-list mt-4">
            {subjects.map(sub => (
              <div key={sub.id} onClick={() => setViewingSubject(sub.id)} style={{cursor: 'pointer'}}>
                <SubjectCard subject={sub} onEdit={() => {}} onDelete={deleteSubject} />
              </div>
            ))}
          </div>
        </div>

        {/* Topics Column */}
        <div className="column">
          <div className="card">
            <h2>Add Topic</h2>
            <form onSubmit={handleTop(onTopicSubmit)} className="form-group">
              <select {...regTop('subjectId')}>
                <option value="">Select Subject...</option>
                {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <input type="text" placeholder="Topic Name" {...regTop('name')} />
              <select {...regTop('difficulty')}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <textarea placeholder="Notes (Optional)" {...regTop('notes')}></textarea>
              <button type="submit" className="btn-secondary">Add Topic</button>
            </form>
          </div>

          <div className="topic-list mt-4 card">
            <h2>{viewingSubject ? "Topics for Selected Subject" : "All Topics"}</h2>
            <div className="topic-items">
              {topics.filter(t => viewingSubject ? t.subjectId === viewingSubject : true).map(topic => (
                <div key={topic.id} className="topic-item">
                  <div className="topic-info">
                    <h4>{topic.name}</h4>
                    <div>
                      <span className={`tag diff-${topic.difficulty.toLowerCase()}`}>{topic.difficulty}</span>
                      <span className="tag status-tag ml-2">{topic.status}</span>
                    </div>
                  </div>
                  <div className="topic-actions">
                    <select 
                      value={topic.status} 
                      onChange={(e) => updateTopic(topic.id, {status: e.target.value})}
                      className="status-select"
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Needs Revision">Needs Revision</option>
                    </select>
                    <button className="btn-danger-sm" onClick={() => deleteTopic(topic.id)}>X</button>
                  </div>
                </div>
              ))}
              {topics.filter(t => viewingSubject ? t.subjectId === viewingSubject : true).length === 0 && (
                <div className="empty-state">No topics found. Add some above!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default Subjects;
