import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export const AdminRoutes = () => {
    // TODO
    const { accessToken } = useAuth();
    console.log(accessToken + "accesing to an admin route")
    if( accessToken == null ) return <Navigate to="/login"/>
    return (
        user.type == "admin" ? <Outlet /> : <Navigate to="/dashboard" />
    )
}