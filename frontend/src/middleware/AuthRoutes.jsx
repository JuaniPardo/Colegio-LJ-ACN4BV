import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export const AuthRoutes = () => {
    const { isAuthenticated } = useAuth()
    return (
      isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    )
}