import * as storage from './storage';
import { GroupedTasks, TaskModel, UrgencyLevels } from './model';

export type APIResponse = {rootTask: TaskModel, groupedTasks: GroupedTasks};

const groupByUrgencyLevel = (head: TaskModel): APIResponse => {
  return {
    rootTask: head,
    groupedTasks: {
      delegate: head.subTasks.filter(x => x.urgency === 'delegate'),
      doFirst: head.subTasks.filter(x => x.urgency === 'doFirst'),
      dontDo: head.subTasks.filter(x => x.urgency === 'dontDo'),
      schedule: head.subTasks.filter(x => x.urgency === 'schedule'),
    }
  }
}

export const findTaskByIndex = (index: string, head: TaskModel): TaskModel | null => {
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

export const fetchTasksForParent = async (parent: string): Promise<APIResponse | null> => {
  const task = findTaskByIndex(parent, await storage.read());
  if (!task) return null;
  return groupByUrgencyLevel(task);
}

export const addTask = async (parentTask: TaskModel, title: string, urgency: UrgencyLevels): Promise<void> => {
  parentTask.subTasks.push({
    id: String(Date.now()),
    title,
    urgency,
    done: false,
    subTasks: [],
  });
  storage.persist();
}