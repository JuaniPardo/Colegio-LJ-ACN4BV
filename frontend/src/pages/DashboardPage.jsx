import { ClassCardContainer } from "../components/ClassCardContainer";
import {Layout} from "../components/Layout/DashboardLayout";

export const DashboardPage = () => {
  return (
    <Layout>
      {/* TODO: REFACTOR RECIBIR H1 COMO PROP EN EL LAYOUT */}
      <h1 className="text-3xl py-5 mb-4 font-bold text-black dark:text-white transition-all">Mis Clases</h1>
      <ClassCardContainer />
    </Layout>
  );
};
