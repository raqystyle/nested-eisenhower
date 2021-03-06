import React, { useEffect } from 'react';
import { read, persist } from './storage';
import { useAppState } from './stateContext';

/**
 * This in the place where we read from and write to the storage
 * 
 * Once the data was read, we mark the state as "loaded"
 */

export const AppShell: React.FC<{}> = ({ children }) => {
  const { state, dispatch } = useAppState();
  useEffect(() => {
    read().then(rootTask => {
      dispatch({ kind: 'SetRootTask', rootTask });
    })
  }, []);

  useEffect(() => {
    if (state.phase === 'loaded') {
      persist(state.rootTask);
    }
  }, [state]);

  return (
    <>
      <header className="p-3 shadow-lg mb-2">
        <div className="text-gray-600 font-bold uppercase">Nested Eisenhower</div>
      </header>
      {state.phase === 'loading' ? <div>Loading...</div> : children}
    </>
  );
}
