import { AuthTemplate } from "@/components/layout/auth";

export const LoginLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
  return <AuthTemplate>{children}</AuthTemplate>;
};

export default LoginLayout;
