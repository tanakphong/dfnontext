import React from 'react';
import { Routes, Route } from 'react-router-dom';
//import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
