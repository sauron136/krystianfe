import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Devlog from './pages/Devlog';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';

export const AuthContext = createContext({
  token: '',
  setToken: (_: string) => {},
  logout: () => {},
});

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useContext(AuthContext);
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

const App = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const navigate = useNavigate();

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/devlog" element={<Devlog />} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          {!token && <Route path="/login" element={<Login />} />}
          {!token && <Route path="/register" element={<Register />} />}
          {token && <Route path="/login" element={<Navigate to="/admin" replace />} />}
          {token && <Route path="/register" element={<Navigate to="/admin" replace />} />}
        </Routes>
      </div>
    </AuthContext.Provider>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;