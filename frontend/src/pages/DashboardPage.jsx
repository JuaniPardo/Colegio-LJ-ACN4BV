import { ClassCardContainer } from "../components/ClassCardContainer";
import Layout from "../components/Layout/DashboardLayout";

export const DashboardPage = () => {
  return (
    <Layout>
      <h1 className="md:h-1/6 text-3xl p-5 font-bold">Mis Clases</h1>
      <ClassCardContainer />
    </Layout>
  );
};
