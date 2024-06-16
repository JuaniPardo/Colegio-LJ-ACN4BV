'use client'

import { Link } from "react-router-dom";


// Map of links to display in the side navigation.
const links = [
  {
    name: 'Inicio',
    href: '/dashboard',
  },
  {
    name: 'Cursos',
    href: '/cursos',
  },
  {
    name: 'Notas',
    href: '/notas',
  },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            to={link.href}
            className={
              'flex py-4 px-5 mb-4 grow items-center justify-center gap-2 rounded-md bg-gray-50 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start'
            }
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
}
