import React, { useCallback, useEffect, useState } from 'react'
import Quadrant from './components/Quadrant';
import { useParams } from 'react-router-dom';
import { fetchTasksForParent, addTask } from './api';
import { AppState, useAppState } from './stateContext';

const renderTasks = (state: AppState) => {
  switch(state.phase) {
    case 'loading': return <span>Loading...</span>
    case 'loaded': {
      return (
        <>
          <div className="flex-1 flex">
            <Quadrant
              tasks={state.doFirst}
              label="Do first"
              urgencyLevel="doFirst"
            />
            <Quadrant
              tasks={state.schedule}
              label="Schedule"
              urgencyLevel="schedule"
            />
          </div>
          <div className="flex-1 flex">
            <Quadrant
              tasks={state.delegate}
              label="Delegate"
              urgencyLevel="delegate"
            />
            <Quadrant
              tasks={state.dontDo}
              label="Don't do"
              urgencyLevel="dontDo"
            />
          </div>
        </>
      );
    }
  }
  
}

function renderBreadcrumbs(state: AppState) {
  switch(state.phase) {
    case 'loading': return null;
    case 'loaded': {
      return (
        <section className="text-gray-400">
          Start &rarr; Foo &rarr; {state.currentTask.title}
        </section>
      )
    } 
  }
}

function App() {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useAppState();

  const fetchTasks = useCallback(async (parentId) => {
    const resp = await fetchTasksForParent(parentId);
    if (resp) {
      const { currentTask, groupedTasks } = resp;
      dispatch({ kind: 'TasksLoaded', currentTask, ...groupedTasks });
    }
  }, []);

  useEffect(() => {
    fetchTasks(id || 'root');
  }, [id]);

  return (
    <>
      <header className="p-3 shadow-lg mb-2">
        <div className="text-gray-600 font-bold uppercase">Nested Eisenhower</div>
        {renderBreadcrumbs(state)}
      </header>
      {renderTasks(state)}
    </>
  )
}

export default App
