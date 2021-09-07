import { GroupedTasks, TaskModel } from './model';
import mock from './__mock';

const groupByUrgencyLevel = (head: TaskModel): GroupedTasks => {
  return {
    delegate: head.subTasks.filter(x => x.urgency === 'delegate'),
    doFirst: head.subTasks.filter(x => x.urgency === 'doFirst'),
    dontDo: head.subTasks.filter(x => x.urgency === 'dontDo'),
    schedule: head.subTasks.filter(x => x.urgency === 'schedule'),
  }
}

function dfs(index: number, head: TaskModel): TaskModel | null {
  if (index === head.id) return head;
  for (let task of head.subTasks) {
    let tmp = dfs(index, task);
    if (tmp) return tmp;
  }
  return null;
}

export const fetchTasksForParent = (parent: number): GroupedTasks | null => {
  const headByIndex = dfs(parent, mock);
  if (!headByIndex) return null;
  return groupByUrgencyLevel(headByIndex);
}