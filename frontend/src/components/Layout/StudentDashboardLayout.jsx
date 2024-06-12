import SideNav from "./sidenav"

export default function Layout({ children }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow me-3 md:my-4 p-6 rounded-md bg-gray-50 md:overflow-y-auto">
        {children}
      </div>
    </div>
  );
}