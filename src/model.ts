export type UrgencyLevels = "doFirst" | "schedule" | "delegate" | "dontDo";

export type GroupedTasks = {[P in UrgencyLevels]: TaskModel[]};

export type TaskModel = {
  id: string;
  title: string;
  done: boolean;
  urgency: UrgencyLevels;
  subTasks: Array<TaskModel>
};