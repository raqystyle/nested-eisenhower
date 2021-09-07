import { TaskModel } from './model';

const mock: TaskModel = {
  id: 0,
  title: 'root',
  urgency: 'delegate',
  done: false,
  subTasks: [
    { id: 1, title: 'Learn React', urgency: 'doFirst', done: false, subTasks: [
      { id: 11, title: 'Find good blogs', urgency: 'doFirst', done: false, subTasks: [] },
      { id: 12, title: 'Run a few experiments', urgency: 'schedule', done: false, subTasks: [] },
    ] },
    { id: 2, title: 'Redo the blog with 11ty', urgency: 'delegate', done: false, subTasks: [] },
  ]
}

export default mock;