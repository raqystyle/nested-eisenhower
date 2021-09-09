import React, { useContext, useReducer } from 'react';
import { TaskModel, UrgencyLevels } from './model';
import * as api from './api';

type Action
  = { kind: 'ToggleTodo'; todoId: string; }
  | { kind: 'AddTodo'; todoText: string; urgency: UrgencyLevels }
  | { kind: 'TasksLoaded'; rootTask: TaskModel; }
  | { kind: 'SetCurrentTaskId'; currentTaskId: string; }

export type LoadingState = { phase: 'loading', currentTaskId?: string; }
export type LoadedState = {
  phase: 'loaded';
  rootTask: TaskModel;
  currentTaskId: string;
};

export type AppState = LoadingState | LoadedState;

const init: AppState = {
  phase: 'loading'
}

function reducer(state: AppState, action: Action): AppState {
  switch(action.kind) {
    case 'SetCurrentTaskId': {
      return {
        ...state,
        currentTaskId: action.currentTaskId
      }
    }
    case 'TasksLoaded': {
      return {
        phase: 'loaded',
        currentTaskId: state.currentTaskId || 'root',
        rootTask: action.rootTask
      }
    }
    case 'AddTodo': {
      if (state.phase === 'loaded') {
        if (!state.currentTaskId) return state;
        return {
          ...state,
          rootTask: api.addSubTask(state.currentTaskId, action.todoText, action.urgency, state.rootTask)
        }
      }
      return state;
    }
    case 'ToggleTodo': {
      if (state.phase === 'loaded') {
        return {
          ...state,
          rootTask: api.toggleTodo(action.todoId, state.rootTask)
        }
      }
      return state;
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