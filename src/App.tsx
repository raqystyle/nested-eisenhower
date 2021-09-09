import React, { useCallback, useEffect } from 'react'
import Quadrant from './components/Quadrant';
import { useParams } from 'react-router-dom';
import { fetchRootTaskFromStorage, findTaskById, groupByUrgencyLevel } from './api';
import { AppState, useAppState } from './stateContext';

const renderTasks = (state: AppState) => {
  console.log(state);
  switch(state.phase) {
    case 'loading': return <span>Loading...</span>
    case 'loaded': {
      const grouped = groupByUrgencyLevel(state.rootTask);
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
  }
  
}

function renderBreadcrumbs(state: AppState) {
  switch(state.phase) {
    case 'loading': return null;
    case 'loaded': {
      return (
        <section className="text-gray-400">
          Start &rarr; Foo &rarr; {state.currentTaskId}
        </section>
      )
    } 
  }
}

function App() {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useAppState();

  useEffect(() => {
    console.log('Initial fetch from storage');
    
    fetchRootTaskFromStorage().then(rootTask => {
      dispatch({ kind: 'TasksLoaded', rootTask });
    })
  }, []);

  useEffect(() => {
    const currentTaskId = id || 'root';
    console.log(`Id was changed ${currentTaskId}`);

    dispatch({ kind: 'SetCurrentTaskId', currentTaskId });

    if (state.phase === 'loaded') {
      const rootTask = findTaskById(currentTaskId, state.rootTask);
      if (rootTask) {
        dispatch({ kind: 'TasksLoaded', rootTask });
      }
    }
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
