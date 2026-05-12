import { TasksTemplate } from "@/components/layout/tasks";

export const TasksLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
  return <TasksTemplate>{children}</TasksTemplate>;
};

export default TasksLayout;
