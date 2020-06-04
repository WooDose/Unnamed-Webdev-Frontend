import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/posters';


const byId = (state = {}, action) => {
  switch(action.type) {
    case types.POSTER_MESSAGES_FETCH_COMPLETED: {
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
    case types.POSTER_MESSAGE_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.POSTER_MESSAGE_ADD_COMPLETED: {
      const { oldId, posterMessage } = action.payload;
      const newState = omit(state, oldId);
      newState[posterMessage.id] = {
        ...posterMessage,
        isConfirmed: true,
      };
      return newState;
    }
    case types.POSTER_MESSAGE_REMOVE_STARTED: {
      return omit(state, action.payload.id);
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
    case types.POSTER_MESSAGES_FETCH_COMPLETED: {
      return [...state, ...action.payload.order];
    }
    case types.POSTER_MESSAGE_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.POSTER_MESSAGE_ADD_COMPLETED: {
      const { oldId, posterMessage } = action.payload;
      return state.map(id => id === oldId ? posterMessage.id : id);
    }
    case types.POSTER_MESSAGE_REMOVE_STARTED: {
      return state.filter(id => id !== action.payload.id);
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.POSTER_MESSAGES_FETCH_STARTED: {
      return true;
    }
    case types.POSTER_MESSAGES_FETCH_COMPLETED: {
      return false;
    }
    case types.POSTER_MESSAGES_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.POSTER_MESSAGES_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.POSTER_MESSAGES_FETCH_STARTED: {
      return null;
    }
    case types.POSTER_MESSAGES_FETCH_COMPLETED: {
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

export const getPosterMessages = state => state.order.map(id => getPosterMessage(state, id));
export const isFetchingPosterMessages = state => state.isFetching;
export const getFetchingPosterMessagesError = state => state.error;