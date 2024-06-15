import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import StudentDashboardPage from './pages/Dashboard/StudentDashboardPage.jsx';
import TeacherDashboardPage from './pages/Dashboard/TeacherDashboardPage.jsx';
import Layout from "./components/Layout/StudentDashboardLayout.jsx";
import { MateriaPage } from './pages/MateriaPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/student-dashboard" element={<Layout><StudentDashboardPage /></Layout>} allowedUserType="student" />
        <Route path="/teacher-dashboard" element={<Layout><TeacherDashboardPage /></Layout>} allowedUserType="teacher" />
        <Route path="/materia/:idMateria" element={<Layout><MateriaPage /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App
