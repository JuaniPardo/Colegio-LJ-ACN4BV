import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage.jsx';
import { MateriaPage } from './pages/MateriaPage.jsx';
import { AuthProvider } from './contexts/AuthProvider.jsx';
import { AuthRoutes } from './middleware/AuthRoutes.jsx';
import { UsuariosPage } from './pages/UsuariosPage.jsx';
import { AdminRoutes } from './middleware/AdminRoutes.jsx';
import { LogOutRoute } from './middleware/LogOutRoute.jsx';
import { EditUsuarioPage } from './pages/EditUsuarioPage.jsx';
import { CrearUsuarioPage } from './pages/CrearUsuarioPage.jsx';
import { NotasPage } from "./pages/NotasPage.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogOutRoute />} />
          <Route element={<AdminRoutes />}>
            <Route path="/usuarios" element={<UsuariosPage />}/>
            <Route path="/usuario/:idUsuario" element={<EditUsuarioPage />}/>
            <Route path="/crearUsuario" element={<CrearUsuarioPage />}/>
          </Route>
          <Route element={<AuthRoutes />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/materia/:idMateria" element={<MateriaPage />} />
            <Route path="/notas" element={<NotasPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
