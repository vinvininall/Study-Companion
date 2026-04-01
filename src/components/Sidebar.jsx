import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBook, FaTasks, FaCalendarAlt, FaRobot } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: <FaHome /> },
    { name: 'Subjects', path: '/subjects', icon: <FaBook /> },
    { name: 'Tasks', path: '/tasks', icon: <FaTasks /> },
  ];

  return (
    <motion.div
      className="sidebar"
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="sidebar-logo">
        <FaRobot className="logo-icon" /> AI Study
      </div>
      <nav className="sidebar-nav">
        {links.map(link => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            {link.icon} <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>
      <li>
        <Link to="/summarize">
          Summarize Topic
        </Link>
      </li>
    </motion.div>
  );
};

export default Sidebar;
