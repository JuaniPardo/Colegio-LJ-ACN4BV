import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage.jsx";
import { MateriaPage } from "./pages/MateriaPage.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import { AuthRoutes } from "./middleware/AuthRoutes.jsx";
import { UsuariosPage } from "./pages/UsuariosPage.jsx";
import { AdminRoutes } from "./middleware/AdminRoutes.jsx";
import { LogOutRoute } from "./middleware/LogOutRoute.jsx";
import { EditUsuarioPage } from "./pages/EditUsuarioPage.jsx";
import { CrearUsuarioPage } from "./pages/CrearUsuarioPage.jsx";
import { NotasPage } from "./pages/NotasPage.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthRoutes />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<AuthRoutes />}>
            <Route path="/dashboard/*" element={<DashboardPage />} />
            <Route path="/logout" element={<LogOutRoute />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
