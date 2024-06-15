import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { LoginPage  } from './pages/LoginPage';
import StudentDashboardPage from './pages/StudentDashboardPage.jsx';
import Layout from "./components/Layout/DashboardLayout.jsx";
import { MateriaPage } from './pages/MateriaPage.jsx';
import { AuthProvider } from './contexts/AuthProvider.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Layout><StudentDashboardPage /></Layout>} allowedUserType="student" />
          <Route path="/materia/:idMateria" element={<Layout><MateriaPage /></Layout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
