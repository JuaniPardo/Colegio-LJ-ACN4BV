import { ClassCardContainer } from "../components/ClassCardContainer";
import {Layout} from "../components/Layout/DashboardLayout";

export const DashboardPage = () => {
  return (
    <Layout>
      <h1 className="text-3xl p-5 font-bold text-black dark:text-white transition-all">Mis Clases</h1>
      <ClassCardContainer />
    </Layout>
  );
};
