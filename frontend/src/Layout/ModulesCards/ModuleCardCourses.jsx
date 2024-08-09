import { GenericModuleCard } from "./GenericModuleCard"

const MODULE_TITLE = "Gestionar Cursos"
const MODULE_DESCRIPTION = "Gestiona todas las clases y distintos cursos que existen en el sistema"
const MODULE_IMG_PATH = "/img/cursos.webp"
const MODULE_LINK_TO = "/dashboard/manage/cursos"

export const ModuleCardCourses = () => {
  return (
    <GenericModuleCard title={MODULE_TITLE} linkTo={MODULE_LINK_TO} imgPath={MODULE_IMG_PATH} description={MODULE_DESCRIPTION}/>
  )
} 