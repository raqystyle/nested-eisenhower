import React, { useCallback, useEffect, useState } from 'react'
import Quadrant from './components/Quadrant';
import { useParams } from 'react-router-dom';
import { fetchTasksForParent, APIResponse, addTask } from './api';
import { GroupedTasks, TaskModel, UrgencyLevels } from './model';

function App() {
  const { id } = useParams<{ id: string }>();
  const [grouped, setGrouped] = useState<GroupedTasks | null>(null);
  const [parentTask, setParentTask] = useState<TaskModel | null>(null);

  const handleOnTaskAdd = useCallback((urgency: UrgencyLevels) => (taskTitle: string) => {
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
            <Quadrant
              tasks={grouped.doFirst}
              label="Do first"
              urgencyLevel="doFirst"
              onAddTask={handleOnTaskAdd('doFirst')}
            />
            <Quadrant
              tasks={grouped.schedule}
              label="Schedule"
              urgencyLevel="schedule"
              onAddTask={handleOnTaskAdd('schedule')}
            />
          </div>
          <div className="flex-1 flex">
            <Quadrant
              tasks={grouped.delegate}
              label="Delegate"
              urgencyLevel="delegate"
              onAddTask={handleOnTaskAdd('delegate')}
            />
            <Quadrant
              tasks={grouped.dontDo}
              label="Don't do"
              urgencyLevel="dontDo"
              onAddTask={handleOnTaskAdd('dontDo')}
            />
          </div>
        </>
      )}
    </>
  )
}

export default App
