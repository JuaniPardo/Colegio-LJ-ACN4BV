import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export const LogOutRoute = () => {
    const { logout } = useAuth();
    logout()
    return (
        <Navigate to="/login" />
    )
}