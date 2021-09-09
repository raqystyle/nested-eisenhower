import { GroupedTasks, TaskModel, UrgencyLevels } from './model';

export const groupByUrgencyLevel = (head: TaskModel): GroupedTasks => {
  return {
    delegate: head.subTasks.filter(x => x.urgency === 'delegate'),
    doFirst: head.subTasks.filter(x => x.urgency === 'doFirst'),
    dontDo: head.subTasks.filter(x => x.urgency === 'dontDo'),
    schedule: head.subTasks.filter(x => x.urgency === 'schedule'),
  };
}

export const findTaskById = (index: string, head: TaskModel): TaskModel | null => {
  let Q = [head];
  while(Q.length) {
    let top = Q.shift()!;
    if (top.id === index) return top;
    for (let child of top.subTasks) {
      Q.push(child);
    }
  }
  return null;
}

export const addSubTask = (
  currentTaskId: string,
  title: string,
  urgency: UrgencyLevels,
  rootTask: TaskModel,
): TaskModel => {
  const parentTask = findTaskById(currentTaskId, rootTask);
  if (!parentTask) return rootTask;
  parentTask.subTasks.push({
    id: String(Date.now()),
    title,
    urgency,
    done: false,
    subTasks: [],
  });
  return rootTask;
}

export const toggleTodo = (taskId: string, rootTask: TaskModel): TaskModel => {
  const task = findTaskById(taskId, rootTask);
  if (!task) return rootTask;
  task.done = !task.done;
  return rootTask;
}