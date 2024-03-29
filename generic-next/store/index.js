import {isBrowser} from '../shared';
import {composeWithDevTools} from "redux-devtools-extension";
import {compose, createStore} from "@reduxjs/toolkit";
import rootReducer, { ui, auth } from './reducer';
import {useMemo} from "react";

let store;
let composeEnhancer;

const initialState = {
  ui,
  auth,
};

if (isBrowser() && process.env.NEXT_PUBLIC_ENV === 'dev') {
  composeEnhancer = composeWithDevTools;
} else {
  composeEnhancer = compose;
}

const initStore = (preloadedState = initialState) => {
  return createStore(rootReducer, preloadedState);
};

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });

    store = undefined;
  }

  if (!isBrowser()) {
    return _store;
  }

  if (!store) {
    store = _store;
  }

  return _store;
};

export const useStore = (initialState) => {
  const store = useMemo(() => {
    return initializeStore(initialState);
  }, [initialState]);

  return store;
}
