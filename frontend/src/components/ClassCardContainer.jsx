import { ClassCard } from "./ClassCard"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faBookmark } from '@fortawesome/free-regular-svg-icons'

const getClassesCards = () => {
    return (true) ? 
    <div className="flex flex-wrap">
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
    </div>
    :
    <div className="flex flex-col justify-center py-20 items-center md:h-5/6 w-full">
        <FontAwesomeIcon icon={faBookmark} className="opacity-25 text-6xl" />
        <p className="text-1xl md:text-2xl text-center py-5 md:px-40 opacity-50">Al parecer no tienes ninguna clase asignada de momento. Intenta de nuevo más tarde o comunicate con un administrador.</p>
    </div>
}

export const ClassCardContainer = () => {
    return <>
            {getClassesCards()}
    </>
} 