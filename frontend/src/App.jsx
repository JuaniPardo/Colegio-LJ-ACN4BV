import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { LoginPage } from "./pages/LoginPage";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import { AuthRoutes } from "./middleware/AuthRoutes.jsx";
import { CookiesProvider } from "react-cookie";
import { Layout } from "./components/Layout/DashboardLayout.jsx";

function App() {
  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <AuthProvider>
        <Toaster position="top-right" />
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<AuthRoutes />}>
              <Route path="/dashboard/*" element={<Layout />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </CookiesProvider>
  );
}

export default App;
