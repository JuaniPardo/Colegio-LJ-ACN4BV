import { Route, Routes } from "react-router-dom";
import SideNav from "./sidenav";
import { ClassCardContainer } from "../ClassCardContainer";
import { UsuariosPage } from "../../pages/UsuariosPage";
import { EditUsuarioPage } from "../../pages/EditUsuarioPage";
import { CrearUsuarioPage } from "../../pages/CrearUsuarioPage";
import { MateriaPage } from "../../pages/MateriaPage";
import { NotasPage } from "../../pages/NotasPage";
import { Page404 } from "../../pages/404page";
import { AdminRoutes } from "../../middleware/AdminRoutes";
import { ProfessorAndStudentRoutes } from "../../middleware/ProfessorAndStudentRoutes";
import { ProfessorRoutes } from "../../middleware/ProfessorRoutes";
import { StudentRoutes } from "../../middleware/StudentRoutes";
export const Layout = () => {
  return (
    <>
      <div className="flex flex-col md:h-screen md:flex-row md:overflow-hidden dark:bg-slate-900 transition-all">
        <div className="w-full md:w-1/5">
          <SideNav />
        </div>
        <div className="w-full py-6 px-10 rounded-md bg-gray-100 dark:bg-slate-800 md:overflow-y-auto transition-all">
          <Routes>
            {/* MAIN DASHBOARD ROUTE */}
            <Route path="/" element={<ClassCardContainer />} />

            {/* ADMIN ROUTES */}
            <Route element={<AdminRoutes />}>
              <Route path="/usuarios" element={<UsuariosPage />} />
              <Route path="/usuarios/:idUsuario" element={<EditUsuarioPage />} />
              <Route path="/usuarios/crear" element={<CrearUsuarioPage />} />
            </Route>

            {/* PROFESSOR AND STUDENT ROUTES */}
            <Route element={<ProfessorAndStudentRoutes />}>
              <Route path="/materias/:idMateria/*" element={<MateriaPage />} />
            </Route>

            {/* PROFFESOR ROUTES */}
            <Route element={<ProfessorRoutes />}>
              <Route path="/materias/:idMateria/*" element={<MateriaPage />} />
            </Route>

            {/* STUDENT ROUTES */}
            <Route element={<StudentRoutes />}>
              <Route path="/notas" element={<NotasPage />} />
            </Route>

            <Route path="/*" element={<Page404 />} />
          </Routes>
        </div>
      </div>
    </>
  );
};
