import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/links';


const byId = (state = {}, action) => {
  switch(action.type) {
    case types.LINKS_FETCH_COMPLETED: {
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
    case types.LINK_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.LINK_ADD_COMPLETED: {
      const { oldId, link } = action.payload;
      const newState = omit(state, oldId);
      newState[link.id] = {
        ...link,
        isConfirmed: true,
      };
      return newState;
    }
    case types.LINK_REMOVE_STARTED: {
      return omit(state, action.payload.id);
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
    case types.LINKS_FETCH_COMPLETED: {
      return [...state, ...action.payload.order];
    }
    case types.LINK_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.LINK_ADD_COMPLETED: {
      const { oldId, link } = action.payload;
      return state.map(id => id === oldId ? link.id : id);
    }
    case types.LINK_REMOVE_STARTED: {
      return state.filter(id => id !== action.payload.id);
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.LINKS_FETCH_STARTED: {
      return true;
    }
    case types.LINKS_FETCH_COMPLETED: {
      return false;
    }
    case types.LINKS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.LINKS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.LINKS_FETCH_STARTED: {
      return null;
    }
    case types.LINKS_FETCH_COMPLETED: {
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

export const getLink = (state, id) => state.byId[id];
export const getLinks = state => state.order.map(id => getLink(state, id));
export const isFetchingLinks = state => state.isFetching;
export const getFetchingLinksError = state => state.error;