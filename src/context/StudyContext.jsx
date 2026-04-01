import React, { createContext, useState, useEffect } from 'react';

export const StudyContext = createContext();

export const StudyProvider = ({ children }) => {
  const loadInitialData = (key, defaultValue) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const [subjects, setSubjects] = useState(() => loadInitialData('study_subjects', []));
  const [topics, setTopics] = useState(() => loadInitialData('study_topics', []));
  const [tasks, setTasks] = useState(() => loadInitialData('study_tasks', []));
  const [apiKey, setApiKey] = useState(() => loadInitialData('study_apikey', ''));

  useEffect(() => { localStorage.setItem('study_subjects', JSON.stringify(subjects)); }, [subjects]);
  useEffect(() => { localStorage.setItem('study_topics', JSON.stringify(topics)); }, [topics]);
  useEffect(() => { localStorage.setItem('study_tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('study_apikey', JSON.stringify(apiKey)); }, [apiKey]);

  return (
    <StudyContext.Provider value={{
      subjects, setSubjects,
      topics, setTopics,
      tasks, setTasks,
      apiKey, setApiKey
    }}>
      {children}
    </StudyContext.Provider>
  );
};
