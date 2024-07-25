'use client'

import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { useEffect, useState } from "react";

// Map of links to display in the side navigation.
const links = [
  {
    name: 'Inicio',
    href: '/dashboard',
  },
  /*{
    name: 'Cursos',
    href: '/cursos',
  },*/
  {
    name: 'Notas',
    href: '/dashboard/notas',
  },
  {
    name: 'Usuarios',
    href: '/dashboard/usuarios',
    user_type: 'admin'
  },
  {
    name: 'Cerrar Sesión',
    href: '/logout',
  }
];

export default function NavLinks() {

  const {accessToken} = useAuth();

  const [ navLinks, setNavLinks ] = useState([]);

  useEffect(() => {
    setNavLinks(links)
  }, [])

  return (
    <>
      {navLinks.map((link, k) => (

            <Link
            key={k} 
            to={link.href}
            className={
              'flex py-4 px-5 mb-4 grow items-center justify-center gap-2 rounded-md bg-gray-50  text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start dark:bg-slate-700 dark:text-white dark:hover:bg-slate-400 dark:hover:text-blue-900 transition-all'
            }
            >
              {link.name}
            </Link>  
        )
      )}  
    </>
  );
}
