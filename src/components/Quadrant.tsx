import React from 'react';
import cx from 'classnames';

export enum UrgencyLevelsMap {
  doFirst = 'bg-green-50',
  schedule = 'bg-blue-50',
  delegate = 'bg-yellow-50',
  dontDo = 'bg-red-50'
}

type UrgencyLevels = keyof typeof UrgencyLevelsMap;

export type QuadrantProps = React.PropsWithChildren<{
  label: string;
  urgencyLevel: UrgencyLevels
}>;

const Quadrant = (props: QuadrantProps) => {
  const { children, urgencyLevel, label } = props;
  return (
    <div className={cx('flex-1', 'p-2', UrgencyLevelsMap[urgencyLevel])}>
      <header className="mb-2">
        <span className="font-bold px-2 py-1 rounded-md bg-white shadow-md mr-2">{label}</span>
        <input className="border-2 border-gray-200 rounded-md text-gray-600 outline-none focus:border-indigo-400" />
        <button className="border-2 rounded-md px-2 bg-white font-bold">Add</button>
      </header>
      {children}
    </div>
  )
}

export default Quadrant;