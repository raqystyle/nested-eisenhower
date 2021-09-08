import React, { useContext, useReducer } from 'react';
import { TaskModel } from './model';

type Action
  = { kind: 'ToggleTodo'; todoId: string; }
  | { kind: 'AddTodo'; todoText: string; }
  | {
      kind: 'TasksLoaded';
      currentTask: TaskModel;
      doFirst: TaskModel[];
      schedule: TaskModel[];
      delegate: TaskModel[];
      dontDo: TaskModel[];
    }

export type LoadingState = { phase: 'loading' }
export type LoadedState = {
  phase: 'loaded';
  currentTask: TaskModel;
  doFirst: TaskModel[];
  schedule: TaskModel[];
  delegate: TaskModel[];
  dontDo: TaskModel[];
};

export type AppState = LoadingState | LoadedState;

const init: AppState = {
  phase: 'loading'
}

function reducer(state: AppState, action: Action): AppState {
  switch(action.kind) {
    case 'AddTodo': {
      console.log(action);
      return state;
    }
    case 'ToggleTodo': {
      console.log(action)
      return state;
    }
    case 'TasksLoaded': {
      return {
        phase: 'loaded',
        ...action,
      };
    }
    default: return state;
  }
}

type ContextType = {
  state: AppState;
  dispatch: (action: Action) => void
}

const Context = React.createContext<ContextType>({
  state: { phase: 'loading' },
  dispatch: () => {}
});
Context.displayName = 'AppStateContext';

export const useAppState = () => useContext(Context);

export const Provider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, init);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}