import { Link } from "react-router-dom";

export const GenericModuleCard = ({ title, description, imgPath, linkTo }) => {
  return (
    <Link to={linkTo} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 mb-4 p-2 hover:cursor-pointer">
      <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:-translate-y-1 hover:shadow-md transition-all">
        <div className="w-full h-36">
          <img className="rounded-t-lg w-full h-full object-cover" src={imgPath} />
        </div>
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
          <p className="mb-3 min-h-16 font-normal text-gray-700 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </Link>
  );
};
