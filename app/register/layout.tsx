import { AuthTemplate } from "@/components/layout/auth";

export const RegisterLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
  return <AuthTemplate>{children}</AuthTemplate>;
};

export default RegisterLayout;
