import { ClassCardContainer } from "../components/ClassCardContainer";

const StudentDashboardPage = () => {
  return (
    <div>
      <h1 className="text-3xl p-5 font-bold">Mis Clases</h1>
      <ClassCardContainer />
    </div>
  );
};

export default StudentDashboardPage;