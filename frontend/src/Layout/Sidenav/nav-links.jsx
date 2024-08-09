import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { USER_TYPES } from "../../utils/UserTypes"
import { toast } from "sonner";

// Map of links to display in the side navigation.
const links = [
  {
    name: "Notas",
    href: "/dashboard/notas",
    user_type: [USER_TYPES.STUDENT],
  },
  {
    name: "Mis Clases",
    href: "/dashboard/clases",
    user_type: [USER_TYPES.STUDENT, USER_TYPES.PROFESSOR],
  },
  {
    name: "Usuarios",
    href: "/dashboard/manage/usuarios",
    user_type: [USER_TYPES.ADMINISTATOR],
  },
  {
    name: "Cursos",
    href: "/dashboard/manage/cursos",
    user_type: [USER_TYPES.ADMINISTATOR],
  },
];

export default function NavLinks({ user_type }) {
  const [navLinks, setNavLinks] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.promise(logout, {
      loading: 'Cerrando sesión...',
      success: () => {
        navigate("/login")
        return `Cierre de sesión exitoso`;
      },
      error: 'Algo ha salido mal, pulsa F5 y vuelve a intentar.',
    });
  };

  useEffect(() => {
    setNavLinks(links);
  }, []);

  return (
    <>
      <Link to={"/dashboard"} className={"flex py-4 px-5 mb-4 grow items-center justify-center gap-2 rounded-md bg-gray-50  text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start dark:bg-slate-700 dark:text-white dark:hover:bg-slate-400 dark:hover:text-blue-900 transition-all"}>
        Dashboard
      </Link>
      {navLinks.map((link, k) => {
        if (link.user_type.indexOf(user_type) !== -1) {
          return (
            <Link key={k} to={link.href} className={"flex py-4 px-5 mb-4 grow items-center justify-center gap-2 rounded-md bg-gray-50  text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start dark:bg-slate-700 dark:text-white dark:hover:bg-slate-400 dark:hover:text-blue-900 transition-all"}>
              {link.name}
            </Link>
          );
        }
      })}
      <button onClick={handleLogout} className={"flex py-4 px-5 mb-4 grow items-center justify-center gap-2 rounded-md bg-gray-50  text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start dark:bg-slate-700 dark:text-white dark:hover:bg-slate-400 dark:hover:text-blue-900 transition-all"}>
        Cerrar Sesión
      </button>
    </>
  );
}
