import React, { useCallback, useEffect, useState } from 'react'
import Quadrant from './components/Quadrant';
import Task from './components/Task';
import { useParams } from 'react-router-dom';
import { fetchTasksForParent, APIResponse, addTask } from './api';
import { GroupedTasks, TaskModel, UrgencyLevels } from './model';

function App() {
  const { id } = useParams<{ id: string }>();
  const [grouped, setGrouped] = useState<GroupedTasks | null>(null);
  const [parentTask, setParentTask] = useState<TaskModel | null>(null);

  const handleOnTaskAdd = useCallback((urgency: UrgencyLevels) => (taskTitle: string) => {
    console.log("App: handleOnTaskAdd");
    addTask(parentTask!, taskTitle, urgency);
  }, [parentTask])

  useEffect(() => {
    const resp = fetchTasksForParent(id || 'root');
    if (resp) {
      const { rootTask, groupedTasks } = resp;
      setGrouped(groupedTasks);
      setParentTask(rootTask);
    }
  }, [id]);

  return (
    <>
      <header className="text-gray-600 p-3 shadow-lg mb-2 font-bold uppercase">
        Nested Eisenhower: "{parentTask?.title}"
      </header>
      {grouped && (
        <>
          <div className="flex-1 flex">
            <Quadrant label="Do first" urgencyLevel="doFirst" onAddTask={handleOnTaskAdd('doFirst')}>
              {grouped.doFirst.length ? grouped.doFirst.map(task => {
                return <Task key={task.id} id={task.id} title={task.title} done={task.done} />
              }) : <span>Nothing yet</span>}
            </Quadrant>
            <Quadrant label="Schedule" urgencyLevel="schedule" onAddTask={handleOnTaskAdd('schedule')}>
              {grouped.schedule.length ? grouped.schedule.map(task => {
                return <Task key={task.id} id={task.id} title={task.title} done={task.done} />
              }) : <span>Nothing yet</span>}
            </Quadrant>
          </div>
          <div className="flex-1 flex">
            <Quadrant label="Delegate" urgencyLevel="delegate" onAddTask={handleOnTaskAdd('delegate')}>
              {grouped.delegate.length ? grouped.delegate.map(task => {
                return <Task key={task.id} id={task.id} title={task.title} done={task.done} />
              }) : <span>Nothing yet</span>}
            </Quadrant>
            <Quadrant label="Don't do" urgencyLevel="dontDo" onAddTask={handleOnTaskAdd('dontDo')}>
              {grouped.dontDo.length ? grouped.dontDo.map(task => {
                return <Task key={task.id} id={task.id} title={task.title} done={task.done} />
              }) : <span>Nothing yet</span>}
            </Quadrant>
          </div>
        </>
      )}
    </>
  )
}

export default App
