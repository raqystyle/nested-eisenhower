import React from "react";
import cx from 'classnames';
import { TaskModel } from '../model';
import { Link } from 'react-router-dom';

export type TaskProps = Omit<TaskModel, 'subTasks' | 'urgency'>;

const Task = (props: TaskProps) => {
  const { id, title, done = false } = props;
  return (
    <Link to={`/${id}`} className="p-1 flex items-center" key={id}>
      <span className={cx({
        'line-through': done,
        'text-gray-400': done
      })}>{title}</span>
    </Link>
  )
}

export default Task;