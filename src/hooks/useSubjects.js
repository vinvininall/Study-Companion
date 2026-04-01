import { useContext } from 'react';
import { StudyContext } from '../context/StudyContext';
import { generateId } from '../utils/helpers';

export const useSubjects = () => {
  const { subjects, setSubjects, topics, setTopics, tasks, setTasks } = useContext(StudyContext);

  const addSubject = (subjectData) => {
    const newSubject = { ...subjectData, id: generateId() };
    setSubjects([...subjects, newSubject]);
    return newSubject;
  };

  const updateSubject = (id, subjectData) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, ...subjectData } : s));
  };

  const deleteSubject = (id) => {
    setSubjects(subjects.filter(s => s.id !== id));
    setTopics(topics.filter(t => t.subjectId !== id));
    setTasks(tasks.filter(t => t.subjectId !== id));
  };

  const addTopic = (topicData) => {
    const newTopic = { ...topicData, id: generateId(), status: 'Not Started' };
    setTopics([...topics, newTopic]);
    return newTopic;
  };

  const updateTopic = (id, topicData) => {
    setTopics(topics.map(t => t.id === id ? { ...t, ...topicData } : t));
  };

  const deleteTopic = (id) => {
    setTopics(topics.filter(t => t.id !== id));
    setTasks(tasks.filter(t => t.topicId !== id));
  };

  return { subjects, topics, addSubject, updateSubject, deleteSubject, addTopic, updateTopic, deleteTopic };
};
