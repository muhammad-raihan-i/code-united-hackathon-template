import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/login";
import Register from "./pages/register";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<div>Home Page - Coming Soon</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
