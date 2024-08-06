import { GenericModuleCard } from "./GenericModuleCard";

const MODULE_TITLE = "Gestionar Usuarios"
const MODULE_DESCRIPTION = "Consulta, crea, modifica y elimina usuarios del sistema."
const MODULE_IMG_PATH = "/img/usuarios.webp"
const MODULE_LINK_TO = "/dashboard/usuarios"


export const ModuleCardUsuarios = () => {
  return (
    <GenericModuleCard title={MODULE_TITLE} description={MODULE_DESCRIPTION} imgPath={MODULE_IMG_PATH} linkTo={MODULE_LINK_TO}  />
  );
};