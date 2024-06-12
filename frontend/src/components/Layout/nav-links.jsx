'use client'


// Map of links to display in the side navigation.
const links = [
  {
    name: 'Inicio',
    href: '/student-dashboard',
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
          <a
            key={link.name}
            href={link.href}
            className={
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'
            }
          >
            <p className="">{link.name}</p>
          </a>
        );
      })}
    </>
  );
}
