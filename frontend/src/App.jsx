import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { LoginPage } from "./pages/LoginPage";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import { AuthRoutes } from "./middleware/AuthRoutes.jsx";
import { Layout } from "./components/Layout/DashboardLayout.jsx";
import { useState } from "react";
import { LoadingAppSpinner } from "./components/AppComponents/LoadingAppSpinner.jsx";
import { Page404 } from "./pages/404page.jsx";

const APP_STATUS = {
  LOADING: "Cargando aplicacion...",
  USER_LOADED: "Usuario cargado",
};

function App() {
  const [appStatus, setAppStatus] = useState(APP_STATUS.LOADING);

  const loadUser = () => {
    setAppStatus(APP_STATUS.USER_LOADED);
  };

  return (
    <AuthProvider loadUser={loadUser}>
      {appStatus === APP_STATUS.LOADING && (
        <LoadingAppSpinner />
      )}
      {appStatus === APP_STATUS.USER_LOADED && (
        <>
          <Toaster position="top-center" richColors />
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<AuthRoutes />}>
                <Route path="/dashboard/*" element={<Layout />} />
              </Route>
              <Route path="/*" element={<Page404 />} />
            </Routes>
          </Router>
        </>
      )}
    </AuthProvider>
  );
}

export default App;
