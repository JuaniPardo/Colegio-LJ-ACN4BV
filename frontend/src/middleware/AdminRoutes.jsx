import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export const AdminRoutes = () => {
    const { user } = useAuth();
    console.log(user + "accesing to an admin route")
    if( user == null ) return <Navigate to="/login"/>
    return (
        user.type == "admin" ? <Outlet /> : <Navigate to="/dashboard" />
    )
}