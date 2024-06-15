

export const ClassCard = () => {
    return <>
        <div className="w-full sm:w-1/2 md:w-1/3 mb-4 p-2">
            <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:-translate-y-1 hover:shadow-md transition-all">
                <a href="#">
                    <div className="w-full h-28">
                        <img className="rounded-t-lg w-full h-full object-cover" src="https://picsum.photos/200" alt="" />
                    </div>
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Matematica</h5>
                    </a>
                    <a href="#">
                        <h5 className="mb-2 text-1l font-bold tracking-tight text-gray-900 dark:text-white">Fernando Gaitan</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Descripción de la materia.</p>
                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                    </a>
                </div>
            </div>
        </div>
    </>
}