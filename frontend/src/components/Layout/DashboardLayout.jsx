import { Route, Routes } from "react-router-dom";
import SideNav from "./sidenav";
import { ClassCardContainer } from "../ClassCardContainer";
import { UsuariosPage } from "../../pages/UsuariosPage";
import { EditUsuarioPage } from "../../pages/EditUsuarioPage";
import { CrearUsuarioPage } from "../../pages/CrearUsuarioPage";
import { MateriaPage } from "../../pages/MateriaPage";
import { NotasPage } from "../../pages/NotasPage";
export const Layout = () => {
  return (
    <>
      <div className="flex flex-col md:h-screen md:flex-row md:overflow-hidden dark:bg-slate-900 transition-all">
        <div className="w-full md:w-1/5">
          <SideNav />
        </div>
        <div className="w-full py-6 px-10 rounded-md bg-gray-100 dark:bg-slate-800 md:overflow-y-auto transition-all">
          <Routes>
            <Route path="/" element={<ClassCardContainer />} />
            <Route path="/usuarios" element={<UsuariosPage />} />
            <Route path="/usuarios/:idUsuario" element={<EditUsuarioPage />} />
            <Route path="/usuarios/crear" element={<CrearUsuarioPage />} />
            <Route path="/materias/:idMateria/*" element={<MateriaPage />} />
            <Route path="/notas" element={<NotasPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
};
