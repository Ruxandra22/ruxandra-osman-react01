import {combineReducers} from "@reduxjs/toolkit";
import ui from './ui/uiSlice';

const rootReducer = combineReducers({
  ui,
});

export default rootReducer;
