import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from "./components/Header";
import React, { useState } from "react";
import LoginRegister from './pages/LoginRegister';
import ProfileUpdate from './pages/ProfileUpdate';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/profile" element={<ProfileUpdate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
