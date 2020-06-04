import * as types from '../types/links';


export const startFetchingLinks = () => ({
  type: types.LINKS_FETCH_STARTED,
});
export const completeFetchingLinks = (entities, order) => ({
  type: types.LINKS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});
export const failFetchingLinks = error => ({
  type: types.LINKS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingLink = link => ({
  type: types.LINK_ADD_STARTED,
  payload: link,
});
export const completeAddingLink = (oldId, link) => ({
  type: types.LINK_ADD_COMPLETED,
  payload: {
    oldId,
    link,
  },
});
export const failAddingLink = (oldId, error) => ({
  type: types.LINK_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const startRemovingLink = id => ({
  type: types.LINK_REMOVE_STARTED,
  payload: {
    id,
  },
});
export const completeRemovingLink = () => ({
  type: types.LINK_REMOVE_COMPLETED,
});
export const failRemovingLink = (id, error) => ({
  type: types.LINK_REMOVE_FAILED,
  payload: {
    id,
    error,
  },
});


export const startLikingLink = id => ({
  type: types.LINK_LIKE_STARTED,
  payload: {
    id,
  },
});
export const completeLikingLink = () => ({
  type: types.LINK_LIKE_COMPLETED,
});
export const failLikingLink = (id, error) => ({
  type: types.LINK_LIKE_FAILED,
  payload: {
    id,
    error,
  },
});


export const startEditingLink = (id, caption) => ({
  type: types.LINK_EDIT_STARTED,
  payload: {
    id,
    caption,
  },
});
export const completeEditingLink = () => ({
  type: types.LINK_EDIT_COMPLETED,
});
export const failEditingLink = (id, error) => ({
  type: types.LINK_EDIT_FAILED,
  payload: {
    id,
    error,
  },
});