import { DashboardTemplate } from "@/components/layout/dashboard";

export const DashboardLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
  return <DashboardTemplate>{children}</DashboardTemplate>;
};

export default DashboardLayout;
