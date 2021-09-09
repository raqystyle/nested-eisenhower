import React, { useEffect } from 'react'
import Quadrant from './components/Quadrant';
import { useParams } from 'react-router-dom';
import { findTaskById, groupByUrgencyLevel } from './api';
import { LoadedState, useAppState } from './stateContext';

function renderTasks(state: LoadedState) {
  const grouped = groupByUrgencyLevel(state.currentTask);
  return (
    <>
      <div className="flex-1 flex">
        <Quadrant
          tasks={grouped.doFirst}
          label="Do first"
          urgencyLevel="doFirst"
        />
        <Quadrant
          tasks={grouped.schedule}
          label="Schedule"
          urgencyLevel="schedule"
        />
      </div>
      <div className="flex-1 flex">
        <Quadrant
          tasks={grouped.delegate}
          label="Delegate"
          urgencyLevel="delegate"
        />
        <Quadrant
          tasks={grouped.dontDo}
          label="Don't do"
          urgencyLevel="dontDo"
        />
      </div>
    </>
  );
}

function renderBreadcrumbs(state: LoadedState) {
  return (
    <section className="text-gray-400">
      Start &rarr; Foo &rarr; {state.currentTask.title}
    </section>
  )
}

/**
 * This is the place where we can manipulate the data
 * that was loaded from the storage.
 * 
 * At this point the state will be of type LoadedState
 */

function App() {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useAppState();

  const loadedState = state as LoadedState;

  useEffect(() => {
    const currentTaskId = id || 'root';
    const currentTask = findTaskById(currentTaskId, loadedState.rootTask);
    if (currentTask) {
      dispatch({ kind: 'SetCurrentTask', currentTask, currentTaskId });
    }
  }, [id]);

  return (
    <>
      {renderBreadcrumbs(loadedState)}
      {renderTasks(loadedState)}
    </>
  )
}

export default App
