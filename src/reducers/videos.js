import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/videos';


const byId = (state = {}, action) => {
  switch(action.type) {
    case types.VIDEOS_FETCH_COMPLETED: {
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
    case types.VIDEO_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.VIDEO_ADD_COMPLETED: {
      const { oldId, video } = action.payload;
      const newState = omit(state, oldId);
      newState[video.id] = {
        ...video,
        isConfirmed: true,
      };
      return newState;
    }
    case types.VIDEO_REMOVE_STARTED: {
      return omit(state, action.payload.id);
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
    case types.VIDEOS_FETCH_COMPLETED: {
      return [...state, ...action.payload.order];
    }
    case types.VIDEO_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.VIDEO_ADD_COMPLETED: {
      const { oldId, video } = action.payload;
      return state.map(id => id === oldId ? video.id : id);
    }
    case types.VIDEO_REMOVE_STARTED: {
      return state.filter(id => id !== action.payload.id);
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.VIDEOS_FETCH_STARTED: {
      return true;
    }
    case types.VIDEOS_FETCH_COMPLETED: {
      return false;
    }
    case types.VIDEOS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.VIDEOS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.VIDEOS_FETCH_STARTED: {
      return null;
    }
    case types.VIDEOS_FETCH_COMPLETED: {
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

export const getVideo = (state, id) => state.byId[id];
export const getVideos = state => state.order.map(id => getVideo(state, id));
export const isFetchingVideos = state => state.isFetching;
export const getFetchingVideosError = state => state.error;