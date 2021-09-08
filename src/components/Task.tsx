import React, { useCallback } from "react";
import cx from 'classnames';
import { TaskModel } from '../model';
import { Link } from 'react-router-dom';
import { useAppState } from "../stateContext";

export type TaskProps = Omit<TaskModel, 'subTasks' | 'urgency'>;

const Task = (props: TaskProps) => {
  const { dispatch } = useAppState();
  const { id, title, done = false } = props;
  
  const handleOnTaskToggle = useCallback(() => {
    dispatch({ kind: 'ToggleTodo', todoId: id });
  }, []);
  
  const className = cx({ 'line-through': done, 'text-gray-400': done });
  
  return (
    <div className="p-1, flex, items-center">
      <input type="checkbox" checked={done} onChange={handleOnTaskToggle} />
      <Link to={`/${id}`} className={className}>{title}</Link>
    </div>
  )
}

export default Task;