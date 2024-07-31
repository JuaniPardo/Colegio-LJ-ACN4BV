import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export const AuthRoutes = () => {
    const { isAuthenticated } = useAuth()
    if (!isAuthenticated) {
      return  <Navigate to="/login" />
    }

    return <Outlet />

}