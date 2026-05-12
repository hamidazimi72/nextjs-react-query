import Providers from "@/react-query/providers";

import { RootTemplate } from "@/components/layout/root";

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <RootTemplate>{children}</RootTemplate>
    </Providers>
  );
}
