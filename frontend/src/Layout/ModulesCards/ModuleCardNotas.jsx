import { GenericModuleCard } from "./GenericModuleCard";

const MODULE_TITLE = "Mis Notas"
const MODULE_DESCRIPTION = "Consulta tu promedio en cada clase. También podes acceder a cada nota en un examen o tarea específica."
const MODULE_IMG_PATH = "/img/notas.webp"
const MODULE_LINK_TO = "/dashboard/notas"

export const ModuleCardNotas = () => {
  return (
    <GenericModuleCard title={MODULE_TITLE} description={MODULE_DESCRIPTION} imgPath={MODULE_IMG_PATH} linkTo={MODULE_LINK_TO} />
  );
};