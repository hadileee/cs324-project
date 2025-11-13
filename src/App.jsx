// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimatedBackground from './components/AnimatedBackground';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <>
      <AnimatedBackground />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;