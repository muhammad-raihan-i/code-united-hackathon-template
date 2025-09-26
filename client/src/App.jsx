import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import MainPage from "./pages/mainpage.jsx";
import Login from "./pages/login";
import Register from "./pages/register";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
