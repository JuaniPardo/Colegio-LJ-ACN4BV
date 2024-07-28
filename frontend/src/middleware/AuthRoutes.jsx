import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export const AuthRoutes = () => {
    const { accessToken } = useAuth()
    return (
      accessToken != null ? <Outlet /> : <Navigate to="/login" />
    )
}