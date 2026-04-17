import React from "react";
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../modules/landing/LandingPage';
import Login from "../modules/auth/login";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<div className="flex-center" style={{ height: '100vh', fontSize: '2rem'}}>Register Route Spacer</div>} />
      </Routes>
    </div>
  );
}

export default App;
