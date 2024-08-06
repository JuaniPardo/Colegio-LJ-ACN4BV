import NavLinks from "./nav-links.jsx";
import { useAuth } from "../../contexts/AuthProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { faScrewdriver } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { USER_TYPES } from "../../utils/UserTypes.jsx";

export const SideNav =  () => {
  const [modoOscuro, setModoOscuro] = useState(false);
  const { userData } = useAuth()

  const loadDarkMode = () => {
    try {
      const isDarkMode = JSON.parse(localStorage.getItem("dark_mode"));
      if (isDarkMode === null) localStorage.setItem("dark_mode", false);
      const htmlElement = document.querySelector("html");
      if (isDarkMode) {
        htmlElement.classList.add("dark");
        setModoOscuro(true);
      }
    } catch {
      localStorage.setItem("dark_mode", false);
    }
  };

  const toggleDarkMode = () => {
    const htmlElement = document.querySelector("html");
    if (htmlElement.classList.contains("dark")) {
      localStorage.setItem("dark_mode", false);
      htmlElement.classList.remove("dark");
      setModoOscuro(false);
    } else {
      localStorage.setItem("dark_mode", true);
      htmlElement.classList.add("dark");
      setModoOscuro(true);
    }
  };

  useEffect(() => {
    loadDarkMode();
  }, []);

  return (
    <div className="flex flex-col">
      <a className="text-2xl md:text-3xl flex items-end justify-start bg-blue-600 p-7" href="/">
        <div className="text-white text-1xl md:text-2xl font-bold">{userData.nombre} {userData.apellido}<FontAwesomeIcon icon={(userData.user_type === USER_TYPES.STUDENT) ? faGraduationCap : (userData.user_type === USER_TYPES.ADMINISTATOR) ? faScrewdriver : faPencil} className="ms-2"/></div>
      </a>
      <div className="flex justify-between flex-col p-3">
        <label className="inline-flex items-center mb-2 cursor-pointer p-3">
          <input type="checkbox" checked={modoOscuro} onChange={toggleDarkMode} className="sr-only peer" />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Modo oscuro</span>
        </label>
        <NavLinks user_type={userData.user_type} />
      </div>
    </div>
  );
}
