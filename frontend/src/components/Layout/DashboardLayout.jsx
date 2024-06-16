import { useEffect } from "react";
import SideNav from "./sidenav";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {

  return (
    <div className="flex flex-col md:h-screen md:p-4  md:flex-row md:overflow-hidden">
      <div className="w-full md:w-1/5">
        <SideNav />
      </div>
      <div className="w-full p-6 rounded-md bg-gray-100 md:overflow-y-auto">
        {children}
      </div>
    </div>
  );
}