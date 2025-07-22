import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import Posts from "./pages/Admin/Posts";
import Categories from "./pages/Admin/Categories";
import Projects from "./pages/Admin/Projects";
import Experience from "./pages/Admin/Experience";
import About from "./pages/Admin/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
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