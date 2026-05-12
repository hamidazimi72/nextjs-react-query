"use client";

export const RootTemplate: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
  return (
    <html lang="fa" dir="rtl">
      <body cz-shortcut-listen="true">{children}</body>
    </html>
  );
};
