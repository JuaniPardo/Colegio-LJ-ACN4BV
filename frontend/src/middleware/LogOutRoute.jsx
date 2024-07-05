import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect } from "react";

export const LogOutRoute = () => {
    const { logout } = useAuth();
    
    useEffect(() => {
        logout()
    }, []);

    return (
        <Navigate to="/login" />
    )
}