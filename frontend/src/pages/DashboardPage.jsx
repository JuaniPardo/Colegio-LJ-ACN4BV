import { Route, Router, Routes } from "react-router-dom";
import { ClassCardContainer } from "../components/ClassCardContainer";
import { Layout } from "../components/Layout/DashboardLayout";
import { UsuariosPage } from "./UsuariosPage";
import { EditUsuarioPage } from "./EditUsuarioPage";
import { CrearUsuarioPage } from "./CrearUsuarioPage";
import { MateriaPage } from "./MateriaPage";
import { NotasPage } from "./NotasPage";

export const DashboardPage = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ClassCardContainer />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/usuarios/:idUsuario" element={<EditUsuarioPage />} />
        <Route path="/usuarios/crear" element={<CrearUsuarioPage />} />
        <Route path="/materias/:idMateria" element={<MateriaPage />} />
        <Route path="/notas" element={<NotasPage />} />
      </Routes>
    </Layout>
  );
};
