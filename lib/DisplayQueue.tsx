'use client';
import { createContext, useContext, useReducer } from 'react';

import type { Dispatch, ReactNode } from 'react';

interface IDisplayQueue {
  ids: string[];
  totalCharacters: number;
}

const initialState = {
  ids: [],
  totalCharacters: 0,
};

const DisplayQueueContext = createContext<IDisplayQueue>(initialState);
const DisplayQueueDispatchContext = createContext<Dispatch<any>>(() => {});

type Action =
  | { type: 'ADD'; payload: { id: string; text: string } }
  | { type: 'REMOVE'; payload: { id: string } }
  | { type: 'DECREASE_TOTAL_CHARACTERS'; payload: undefined };

function reducer(state: IDisplayQueue, action: Action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        ids: [...state.ids, action.payload.id],
        totalCharacters: state.totalCharacters + action.payload.text.length,
      };
    case 'REMOVE':
      return {
        ...state,
        ids: state.ids.filter((id) => id !== action.payload.id),
      };
    case 'DECREASE_TOTAL_CHARACTERS':
      return {
        ...state,
        totalCharacters: state.totalCharacters - 1,
      };
    default:
      return state;
  }
}

export const useDisplayQueue = () => {
  return useContext(DisplayQueueContext);
};

export const useDisplayQueueDispatch = () => {
  return useContext(DisplayQueueDispatchContext);
};

export default function DisplayQueueProviders({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DisplayQueueContext.Provider value={state}>
      <DisplayQueueDispatchContext.Provider value={dispatch}>
        {children}
      </DisplayQueueDispatchContext.Provider>
    </DisplayQueueContext.Provider>
  );
}
