import { TaskModel } from "./model";

export const read = async (): Promise<TaskModel> => {
  const raw = localStorage.getItem('tasks');
  if (raw) {
    return JSON.parse(raw) as TaskModel;
  }
  return {
    id: 'root',
    title: 'root',
    urgency: 'doFirst',
    done: false,
    subTasks: [],
  };
}

export const persist = async (rootTask: TaskModel) => {
  localStorage.setItem('tasks', JSON.stringify(rootTask));
}