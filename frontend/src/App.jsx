import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import TeacherDashboardPage from './pages/TeacherDashboardPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/student-dashboard" element={<StudentDashboardPage />} allowedUserType="student" />
        <Route path="/teacher-dashboard" element={<TeacherDashboardPage />} allowedUserType="teacher" />
      </Routes>
    </Router>
  );
}

export default App
