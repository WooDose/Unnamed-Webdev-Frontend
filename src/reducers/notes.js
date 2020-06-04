import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/notes';


const byId = (state = {}, action) => {
  switch(action.type) {
    case types.NOTES_FETCH_COMPLETED: {
      const { entities, order } = action.payload;
      const newState = { ...state };
      order.forEach(id => {
        newState[id] = {
          ...entities[id],
          isConfirmed: true,
        };
      });

      return newState;
    }
    case types.NOTE_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.NOTE_ADD_COMPLETED: {
      const { oldId, note } = action.payload;
      const newState = omit(state, oldId);
      newState[note.id] = {
        ...note,
        isConfirmed: true,
      };
      return newState;
    }
    case types.NOTE_REMOVE_STARTED: {
      return omit(state, action.payload.id);
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
    case types.NOTES_FETCH_COMPLETED: {
      return [...state, ...action.payload.order];
    }
    case types.NOTE_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.NOTE_ADD_COMPLETED: {
      const { oldId, note } = action.payload;
      return state.map(id => id === oldId ? note.id : id);
    }
    case types.NOTE_REMOVE_STARTED: {
      return state.filter(id => id !== action.payload.id);
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.NOTES_FETCH_STARTED: {
      return true;
    }
    case types.NOTES_FETCH_COMPLETED: {
      return false;
    }
    case types.NOTES_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.NOTES_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.NOTES_FETCH_STARTED: {
      return null;
    }
    case types.NOTES_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};


export default combineReducers({
  byId,
  order,
  isFetching,
  error,
});

export const getNote = (state, id) => state.byId[id];
export const getNotes = state => state.order.map(id => getNote(state, id));
export const isFetchingNotes = state => state.isFetching;
export const getFetchingNotesError = state => state.error;