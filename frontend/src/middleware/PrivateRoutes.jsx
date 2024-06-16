import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider"

export const PrivateRoutes = () => {
    const { user } = useAuth();
    return (
        user != null ? <Outlet /> : <Navigate to="/login" />
    )
}