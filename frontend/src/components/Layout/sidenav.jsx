import { useEffect, useState } from "react";
import NavLinks from "./nav-links.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider.jsx";

export default function SideNav() {

  const { user, logout } = useAuth();

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <a
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4"
        href="/"
      >
        <div className="text-white text-2xl font-bold">
          {(user != null) ? user.nombre + " " + user.apellido : "John Doe"}
        </div>
      </a>
      <div className="flex flex-row justify-between md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full rounded-md bg-gray-50 md:block"></div>
        <button onClick={logout} className="flex py-4 px-5 w-full grow items-center justify-center rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start">
          <div className="">Cerrar Sesión</div>
        </button>
      </div>
    </div>
  );
}
