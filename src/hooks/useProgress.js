import { useContext, useMemo } from 'react';
import { StudyContext } from '../context/StudyContext';

export const useProgress = () => {
  const { tasks, topics, subjects } = useContext(StudyContext);

  const overallProgress = useMemo(() => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter(t => t.status === 'Completed').length;
    return Math.round((completedTasks / tasks.length) * 100);
  }, [tasks]);

  const stats = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'Completed').length;
    const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
    const revisionTasks = tasks.filter(t => t.status === 'Revision').length;
    
    const overdueTasks = tasks.filter(t => {
      if (t.status === 'Completed') return false;
      if (!t.deadline) return false;
      // Truncate to day for comparison
      const deadlineDate = new Date(t.deadline);
      deadlineDate.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return deadlineDate.getTime() < today.getTime();
    }).length;

    return { totalTasks, completedTasks, pendingTasks, revisionTasks, overdueTasks };
  }, [tasks]);

  const subjectProgress = useMemo(() => {
    const subjectStats = {};
    topics.forEach(topic => {
      if (!subjectStats[topic.subjectId]) {
        subjectStats[topic.subjectId] = { total: 0, completed: 0 };
      }
      subjectStats[topic.subjectId].total += 1;
      if (topic.status === 'Completed') {
        subjectStats[topic.subjectId].completed += 1;
      }
    });

    return Object.entries(subjectStats).map(([subjectId, topicStats]) => {
      const subject = subjects.find(s => s.id === subjectId);
      return {
        subjectId,
        name: subject ? subject.name : 'Unknown',
        color: subject ? subject.color : '#8884d8',
        completionPercentage: topicStats.total > 0 ? Math.round((topicStats.completed / topicStats.total) * 100) : 0,
        completedTopics: topicStats.completed,
        totalTopics: topicStats.total
      };
    });
  }, [topics, subjects]);

  return { overallProgress, stats, subjectProgress };
};
