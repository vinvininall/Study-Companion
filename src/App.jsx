import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { StudyProvider } from './context/StudyContext';
import Sidebar from './components/Sidebar';
import Summarize from "./pages/Summarize";

import Dashboard from './pages/Dashboard';
import Subjects from './pages/Subjects';
import Tasks from './pages/Tasks';

function App() {
  return (
    <StudyProvider>
      <Router>
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/summarize" element={<Summarize />} />
            </Routes>
          </main>
          <ToastContainer theme="dark" position="bottom-right" />
        </div>
      </Router>
    </StudyProvider>
  );
}

export default App;
