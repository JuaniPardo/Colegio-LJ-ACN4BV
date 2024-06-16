import { ClassCardContainer } from "../components/ClassCardContainer";

export const DashboardPage = () => {
  return (
    <>
      <h1 className="md:h-1/6 text-3xl p-5 font-bold">Mis Clases</h1>
      <ClassCardContainer />
    </>
  );
};
