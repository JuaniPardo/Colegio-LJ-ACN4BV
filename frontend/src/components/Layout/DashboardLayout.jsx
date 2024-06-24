import SideNav from "./sidenav";
export const Layout = ({ children }) => {

  return (
    <div className="flex flex-col md:h-screen md:flex-row md:overflow-hidden dark:bg-slate-900 transition-all">
      <div className="w-full md:w-1/5">
        <SideNav />
      </div>
      <div className="w-full p-6 rounded-md bg-gray-100 dark:bg-slate-800 md:overflow-y-auto transition-all">
        {children}
      </div>
    </div>
  );
}