import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { USER_TYPES } from "../utils/UserTypes";

export const ProffesorRoutes = () => {
    // TODO
    const { userData } = useAuth();
    return (
        userData.user_type == USER_TYPES.PROFFESOR ? <Outlet /> : <Navigate to="/dashboard" />
    )
}