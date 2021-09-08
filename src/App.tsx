import React, { useCallback, useEffect, useState } from 'react'
import Quadrant from './components/Quadrant';
import { useParams } from 'react-router-dom';
import { fetchTasksForParent, addTask } from './api';
import { TaskModel, UrgencyLevels } from './model';

function App() {
  const { id } = useParams<{ id: string }>();
  const [doFirstTasks, setDoFirstTasks] = useState<TaskModel[]>([]);
  const [scheduleTasks, setScheduleTasks] = useState<TaskModel[]>([]);
  const [delegateTasks, setDelegateTasks] = useState<TaskModel[]>([]);
  const [dontDoTasks, setDontDoTasks] = useState<TaskModel[]>([]);
  const [parentTask, setParentTask] = useState<TaskModel | null>(null);

  const fetchTasks = useCallback(async (parentId) => {
    const resp = await fetchTasksForParent(parentId);
    if (resp) {
      const { rootTask, groupedTasks } = resp;
      setDoFirstTasks(groupedTasks.doFirst);
      setScheduleTasks(groupedTasks.schedule);
      setDelegateTasks(groupedTasks.delegate);
      setDontDoTasks(groupedTasks.dontDo);
      setParentTask(rootTask);
    }
  }, []);

  const handleOnTaskAdd = useCallback((urgency: UrgencyLevels) => (taskTitle: string) => {
    addTask(parentTask!, taskTitle, urgency);
    fetchTasks(id || 'root');
  }, [parentTask])

  useEffect(() => {
    fetchTasks(id || 'root');
  }, [id]);

  return (
    <>
      <header className="p-3 shadow-lg mb-2">
        <div className="text-gray-600 font-bold uppercase">Nested Eisenhower</div>
        <section className="text-gray-400">
          Start &rarr; Foo &rarr; {parentTask?.title}
        </section>
      </header>
      <div className="flex-1 flex">
        <Quadrant
          tasks={doFirstTasks}
          label="Do first"
          urgencyLevel="doFirst"
          onAddTask={handleOnTaskAdd('doFirst')}
        />
        <Quadrant
          tasks={scheduleTasks}
          label="Schedule"
          urgencyLevel="schedule"
          onAddTask={handleOnTaskAdd('schedule')}
        />
      </div>
      <div className="flex-1 flex">
        <Quadrant
          tasks={delegateTasks}
          label="Delegate"
          urgencyLevel="delegate"
          onAddTask={handleOnTaskAdd('delegate')}
        />
        <Quadrant
          tasks={dontDoTasks}
          label="Don't do"
          urgencyLevel="dontDo"
          onAddTask={handleOnTaskAdd('dontDo')}
        />
      </div>
    </>
  )
}

export default App
