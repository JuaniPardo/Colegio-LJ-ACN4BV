
import { useAuth } from "../contexts/AuthProvider";
import { ModuleCardClases } from "../Layout/ModulesCards/ModuleCardClases";
import { ModuleCardCourses } from "../Layout/ModulesCards/ModuleCardCourses";
import { ModuleCardNotas } from "../Layout/ModulesCards/ModuleCardNotas";
import { ModuleCardUsuarios } from "../Layout/ModulesCards/ModuleCardUsuarios";
import { USER_TYPES } from "../utils/UserTypes";

export const DashboardPage = () => {
  const { userData } = useAuth();

  return (
    <>
      <h1 className="text-3xl py-5 mb-4 font-bold text-black dark:text-white transition-all">Mi Dashboard Personal</h1>
      <div className="flex flex-wrap">
        {userData.user_type === USER_TYPES.ADMINISTATOR && (
          <>
            <ModuleCardUsuarios />
            <ModuleCardCourses />
          </>
        )}
        {userData.user_type === USER_TYPES.STUDENT && 
        (
          <>
            <ModuleCardClases />
            <ModuleCardNotas />
          </>
        )}
        {userData.user_type === USER_TYPES.PROFESSOR && 
        (
          <>
            <ModuleCardClases />
          </>
        )}
      </div>
    </>
  );
};
