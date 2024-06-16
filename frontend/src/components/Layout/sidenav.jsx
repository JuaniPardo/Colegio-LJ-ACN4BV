import { useEffect, useState } from "react";
import NavLinks from "./nav-links.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider.jsx";

export default function SideNav() {

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const htmlElement = document.querySelector("html");
    if(htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark");
    } else {
      htmlElement.classList.add("dark");
    }
  }

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
      <div className="flex flex-row justify-between md:flex-col">
        <label class="inline-flex items-center me-5 cursor-pointer">
          <input type="checkbox" onChange={toggleDarkMode} class="sr-only peer" />
            <div class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Modo oscuro</span>
        </label>
        <NavLinks />
        <div className="hidden h-auto w-full rounded-md bg-gray-50 md:block"></div>
        <button onClick={logout} className="flex py-4 px-5 w-full grow items-center justify-center rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start">
          <div className="">Cerrar Sesión</div>
        </button>
      </div>
    </div>
  );
}
