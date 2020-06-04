import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/images';


const byId = (state = {}, action) => {
  switch(action.type) {
    case types.IMAGES_FETCH_COMPLETED: {
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
    case types.IMAGE_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.IMAGE_ADD_COMPLETED: {
      const { oldId, image } = action.payload;
      const newState = omit(state, oldId);
      newState[image.id] = {
        ...image,
        isConfirmed: true,
      };
      return newState;
    }
    case types.IMAGE_REMOVE_STARTED: {
      return omit(state, action.payload.id);
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
    case types.IMAGES_FETCH_COMPLETED: {
      return [...state, ...action.payload.order];
    }
    case types.IMAGE_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.IMAGE_ADD_COMPLETED: {
      const { oldId, image } = action.payload;
      return state.map(id => id === oldId ? image.id : id);
    }
    case types.IMAGE_REMOVE_STARTED: {
      return state.filter(id => id !== action.payload.id);
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.IMAGES_FETCH_STARTED: {
      return true;
    }
    case types.IMAGES_FETCH_COMPLETED: {
      return false;
    }
    case types.IMAGES_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.IMAGES_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.IMAGES_FETCH_STARTED: {
      return null;
    }
    case types.IMAGES_FETCH_COMPLETED: {
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

export const getImage = (state, id) => state.byId[id];
export const getImages = state => state.order.map(id => getImage(state, id));
export const isFetchingImages = state => state.isFetching;
export const getFetchingImagesError = state => state.error;