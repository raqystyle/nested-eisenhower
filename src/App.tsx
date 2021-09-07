import React, { useEffect, useState } from 'react'
import Quadrant from './components/Quadrant';
import Task from './components/Task';
import { useParams } from 'react-router-dom';
import { fetchTasksForParent } from './api';
import { GroupedTasks } from './model';

function App() {
  const { id } = useParams<{ id: string }>();
  const [resp, setResp] = useState<GroupedTasks | null>(null);

  useEffect(() => {
    setResp(fetchTasksForParent(parseInt(id, 10)));
  }, [id]);

  return (
    <>
      <header className="text-gray-600 p-3 shadow-lg mb-2 font-bold uppercase">
        Nested Eisenhower {id}
      </header>
      {resp && (
        <>
          <div className="flex-1 flex">
            <Quadrant label="Do first" urgencyLevel="doFirst">
              {resp.doFirst.map(task => {
                return <Task key={task.id} id={task.id} title={task.title} done={task.done} hasSubtasks={task.subTasks.length > 0} />
              })}
            </Quadrant>
            <Quadrant label="Schedule" urgencyLevel="schedule">
              {resp.schedule.map(task => {
                return <Task key={task.id} id={task.id} title={task.title} done={task.done} hasSubtasks={task.subTasks.length > 0} />
              })}
            </Quadrant>
          </div>
          <div className="flex-1 flex">
            <Quadrant label="Delegate" urgencyLevel="delegate">
              {resp.delegate.map(task => {
                return <Task key={task.id} id={task.id} title={task.title} done={task.done} hasSubtasks={task.subTasks.length > 0} />
              })}
            </Quadrant>
            <Quadrant label="Don't do" urgencyLevel="dontDo">
              {resp.dontDo.map(task => {
                return <Task key={task.id} id={task.id} title={task.title} done={task.done} hasSubtasks={task.subTasks.length > 0} />
              })}
            </Quadrant>
          </div>
        </>
      )}
    </>
  )
}

export default App
