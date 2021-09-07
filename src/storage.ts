import { TaskModel } from "./model";

let rootPointer: TaskModel | null = null;

export const read = () => {
  const raw = localStorage.getItem('tasks');
  if (raw) {
    rootPointer = JSON.parse(raw) as TaskModel;
    return rootPointer;
  }
  rootPointer = {
    id: 'root',
    title: 'root',
    urgency: 'doFirst',
    done: false,
    subTasks: [],
  };
  return rootPointer;
}

export const persist = () => {
  if (rootPointer === null) return;
  localStorage.setItem('tasks', JSON.stringify(rootPointer));
}