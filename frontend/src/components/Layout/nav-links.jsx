import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";

// Map of links to display in the side navigation.
const links = [
  {
    name: "Inicio",
    href: "/dashboard",
  },
  {
    name: "Notas",
    href: "/dashboard/notas",
  },
  {
    name: "Usuarios",
    href: "/dashboard/usuarios",
    user_type: "admin",
  },
];

export default function NavLinks() {
  const [navLinks, setNavLinks] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    const logoutResult = logout();
    logoutResult.then(result => {
      if(result) navigate('/login') 
    })
  };

  useEffect(() => {
    setNavLinks(links);
  }, []);

  return (
    <>
      {navLinks.map((link, k) => (
        <Link
          key={k}
          to={link.href}
          className={
            "flex py-4 px-5 mb-4 grow items-center justify-center gap-2 rounded-md bg-gray-50  text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start dark:bg-slate-700 dark:text-white dark:hover:bg-slate-400 dark:hover:text-blue-900 transition-all"
          }
        >
          {link.name}
        </Link>
      ))}
      <button
        onClick={handleLogout}
        className={
          "flex py-4 px-5 mb-4 grow items-center justify-center gap-2 rounded-md bg-gray-50  text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start dark:bg-slate-700 dark:text-white dark:hover:bg-slate-400 dark:hover:text-blue-900 transition-all"
        }
      >
        Cerrar Sesión
      </button>
    </>
  );
}
