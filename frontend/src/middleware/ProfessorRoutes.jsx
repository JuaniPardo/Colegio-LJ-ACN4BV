import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { USER_TYPES } from "../utils/UserTypes";

export const ProfessorRoutes = () => {
    // TODO
    const { userData } = useAuth();
    return (
        userData.user_type == USER_TYPES.PROFESSOR ? <Outlet /> : <Navigate to="/dashboard" />
    )
}