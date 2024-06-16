import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage.jsx';
import Layout from "./components/Layout/DashboardLayout.jsx";
import { MateriaPage } from './pages/MateriaPage.jsx';
import { AuthProvider } from './contexts/AuthProvider.jsx';
import { PrivateRoutes } from './private_routes/PrivateRoutes.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} allowedUserType="student" />
            <Route path="/materia/:idMateria" element={<Layout><MateriaPage /></Layout>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
