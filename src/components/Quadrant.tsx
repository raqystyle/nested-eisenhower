import React, { ChangeEvent, useCallback, useState } from 'react';
import cx from 'classnames';
import { UrgencyLevels } from '../model';

export const UrgencyLevelsMap: {[P in UrgencyLevels]: string} = {
  doFirst: 'bg-green-50',
  schedule: 'bg-blue-50',
  delegate: 'bg-yellow-50',
  dontDo: 'bg-red-50'
}

export type QuadrantProps = React.PropsWithChildren<{
  label: string;
  urgencyLevel: UrgencyLevels;
  onAddTask: (title: string) => void;
}>;

const Quadrant = (props: QuadrantProps) => {
  const [inputVal, setInputVal] = useState('');
  const { children, urgencyLevel, label, onAddTask } = props;

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    console.log('handleOnChange', e.target.value);
     
    setInputVal(e.target.value);
  }, []);

  const handleOnAddBtnClick = useCallback(() => {
    const val = inputVal.trim();
    if (val) {
      console.log("Quadrant: handleOnAddBtnClick");
      setInputVal('');
      onAddTask(val);
    }
  }, []);

  return (
    <div className={cx('flex-1', 'p-2', UrgencyLevelsMap[urgencyLevel])}>
      <header className="mb-2">
        <span className="font-bold px-2 py-1 rounded-md bg-white shadow-md mr-2">{label}</span>
        <input onChange={handleOnChange} value={inputVal} className="border-2 border-gray-200 rounded-md text-gray-600 outline-none focus:border-indigo-400" />
        <button onClick={handleOnAddBtnClick} className="border-2 rounded-md px-2 bg-white font-bold">Add</button>
      </header>
      {children}
    </div>
  )
}

export default Quadrant;