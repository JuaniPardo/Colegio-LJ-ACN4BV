export const ClassCard = ({ titulo, descripcion, imgURL }) => {
    // MAKE A -> WORKING LINK and receive materia id
    return <>
        <a className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 mb-4 p-2 hover:cursor-pointer">
            <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:-translate-y-1 hover:shadow-md transition-all">
                <div className="w-full h-28">
                    <img className="rounded-t-lg w-full h-full object-cover" src={imgURL}/>
                </div>
                <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{titulo}</h5>
                    {/* <p className="mb-2 text-1l font-bold tracking-tight text-gray-900 dark:text-white">{`${materia.profesor.nombre} ${materia.profesor.apellido}` }</p> */}
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{descripcion}</p>
                </div>
            </div>
        </a>
    </>
}