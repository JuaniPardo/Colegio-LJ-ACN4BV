import { useAuth } from "../../contexts/AuthProvider";
import { LoginPage } from "../../pages/LoginPage";
import SideNav from "./sidenav";
export const Layout = ({ children }) => {
  const { accessToken } = useAuth();

  return (
    <>
      {!accessToken ? (
        <LoginPage />
      ) : (
        <div className="flex flex-col md:h-screen md:flex-row md:overflow-hidden dark:bg-slate-900 transition-all">
          <div className="w-full md:w-1/5">
            <SideNav />
          </div>
          <div className="w-full py-6 px-10 rounded-md bg-gray-100 dark:bg-slate-800 md:overflow-y-auto transition-all">
              {children}
          </div>
        </div>
      )}
    </>
  );
};
