import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export const AuthRoutes = () => {
    const { cookies } = useAuth()
    return (
        cookies.access_token != null ? <Outlet /> : <Navigate to="/login" />
    )
}