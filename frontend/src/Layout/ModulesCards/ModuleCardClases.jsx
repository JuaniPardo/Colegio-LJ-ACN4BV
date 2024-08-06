import { GenericModuleCard } from "./GenericModuleCard";

const MODULE_TITLE = "Mis Clases"
const MODULE_DESCRIPTION = "Accede a tus distintas clases"
const MODULE_IMG_PATH = "/img/clases.webp"
const MODULE_LINK_TO = "/dashboard/clases"

export const ModuleCardClases = () => {
  return (
    <GenericModuleCard title={MODULE_TITLE} description={MODULE_DESCRIPTION} imgPath={MODULE_IMG_PATH} linkTo={MODULE_LINK_TO} />
  );
};