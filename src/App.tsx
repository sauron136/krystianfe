import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portfolio from './components/Portfolio';
import Login from "./pages/Admin/Login";
import Register from "./pages/Admin/Register";
import Dashboard from "./pages/Admin/Dashboard";
import Posts from "./pages/Admin/Posts";
import Categories from "./pages/Admin/Categories";
import Projects from "./pages/Admin/Projects";
import Experience from "./pages/Admin/Experience";
import About from "./pages/Admin/About";
import AdminDashboard from './components/admin/AdminDashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/posts" element={<Posts />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/projects" element={<Projects />} />
        <Route path="/admin/experience" element={<Experience />} />
        <Route path="/admin/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;