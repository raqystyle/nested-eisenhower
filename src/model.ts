export type UrgencyLevels = "doFirst" | "schedule" | "delegate" | "dontDo";

export type GroupedTasks = {[P in UrgencyLevels]: TaskModel[]};

/**
 * The data is represented as an N-ary tree
 */
export type TaskModel = {
  id: string;
  title: string;
  done: boolean;
  urgency: UrgencyLevels;
  subTasks: Array<TaskModel>
};