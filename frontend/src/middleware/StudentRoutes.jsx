import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { USER_TYPES } from "../utils/UserTypes";

export const StudentRoutes = () => {
    // TODO
    const { userData } = useAuth();
    return (
        userData.user_type == USER_TYPES.STUDENT ? <Outlet /> : <Navigate to="/dashboard" />
    )
}