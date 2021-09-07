import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import cx from 'classnames';
import { UrgencyLevels, TaskModel } from '../model';
import Task from './Task';

export const UrgencyLevelsMap: {[P in UrgencyLevels]: string} = {
  doFirst: 'bg-green-50',
  schedule: 'bg-blue-50',
  delegate: 'bg-yellow-50',
  dontDo: 'bg-red-50'
}

export type QuadrantProps = {
  label: string;
  urgencyLevel: UrgencyLevels;
  tasks: TaskModel[];
  onAddTask: (title: string) => void;
};

const Quadrant = (props: QuadrantProps) => {
  const [inputVal, setInputVal] = useState('');
  const { urgencyLevel, label, tasks, onAddTask } = props;

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  }, []);

  const handleOnAddBtnClick = () => {
    const val = inputVal.trim();
    if (val) {
      setInputVal('');
      onAddTask(val);
    }
  };

  const renderedTasks = () => {
    if (tasks.length === 0) {
      return <span>Nothing yet</span>;
    }
    return tasks.map(task => {
      return <Task key={task.id} id={task.id} title={task.title} done={task.done} />
    });
  };

  return (
    <div className={cx('flex-1', 'p-2', UrgencyLevelsMap[urgencyLevel])}>
      <header className="mb-2">
        <span className="font-bold px-2 py-1 rounded-md bg-white shadow-md mr-2">{label}</span>
        <input onChange={handleOnChange} value={inputVal} className="border-2 border-gray-200 rounded-md text-gray-600 outline-none focus:border-indigo-400" />
        <button onClick={handleOnAddBtnClick} className="border-2 rounded-md px-2 bg-white font-bold">Add</button>
      </header>
      {renderedTasks()}
    </div>
  )
}

export default Quadrant;