import * as types from '../types/posters';


export const startFetchingPosterMessagess = () => ({
  type: types.POSTER_MESSAGES_FETCH_STARTED,
});
export const completeFetchingPosterMessages = (entities, order) => ({
  type: types.POSTER_MESSAGES_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});
export const failFetchingPosterMessagess = error => ({
  type: types.POSTER_MESSAGES_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingPosterMessages = PosterMessages => ({
  type: types.POSTER_MESSAGE_ADD_STARTED,
  payload: PosterMessages,
});
export const completeAddingPosterMessages = (oldId, PosterMessages) => ({
  type: types.POSTER_MESSAGE_ADD_COMPLETED,
  payload: {
    oldId,
    PosterMessages,
  },
});
export const failAddingPosterMessages = (oldId, error) => ({
  type: types.POSTER_MESSAGE_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const startRemovingPosterMessages = id => ({
  type: types.POSTER_MESSAGE_REMOVE_STARTED,
  payload: {
    id,
  },
});
export const completeRemovingPosterMessages = () => ({
  type: types.POSTER_MESSAGE_REMOVE_COMPLETED,
});
export const failRemovingPosterMessages = (id, error) => ({
  type: types.POSTER_MESSAGE_REMOVE_FAILED,
  payload: {
    id,
    error,
  },
});

