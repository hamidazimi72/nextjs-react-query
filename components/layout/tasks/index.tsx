"use client";

export const TasksTemplate = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-5xl mx-auto p-4 shadow" id="tasks-layout">
      {children}
    </div>
  );
};
