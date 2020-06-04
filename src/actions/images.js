import * as types from '../types/images';


export const startFetchingImages = () => ({
  type: types.IMAGES_FETCH_STARTED,
});
export const completeFetchingImages = (entities, order) => ({
  type: types.IMAGES_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});
export const failFetchingImages = error => ({
  type: types.IMAGES_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingImage = image => ({
  type: types.IMAGE_ADD_STARTED,
  payload: image,
});
export const completeAddingImage = (oldId, image) => ({
  type: types.IMAGE_ADD_COMPLETED,
  payload: {
    oldId,
    image,
  },
});
export const failAddingImage = (oldId, error) => ({
  type: types.IMAGE_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const startRemovingImage = id => ({
  type: types.IMAGE_REMOVE_STARTED,
  payload: {
    id,
  },
});
export const completeRemovingImage = () => ({
  type: types.IMAGE_REMOVE_COMPLETED,
});
export const failRemovingImage = (id, error) => ({
  type: types.IMAGE_REMOVE_FAILED,
  payload: {
    id,
    error,
  },
});


export const startLikingImage = id => ({
  type: types.IMAGE_LIKE_STARTED,
  payload: {
    id,
  },
});
export const completeLikingImage = () => ({
  type: types.IMAGE_LIKE_COMPLETED,
});
export const failLikingImage = (id, error) => ({
  type: types.IMAGE_LIKE_FAILED,
  payload: {
    id,
    error,
  },
});


export const startEditingImage = (id, caption) => ({
  type: types.IMAGE_EDIT_STARTED,
  payload: {
    id,
    caption,
  },
});
export const completeEditingImage = () => ({
  type: types.IMAGE_EDIT_COMPLETED,
});
export const failEditingImage = (id, error) => ({
  type: types.IMAGE_EDIT_FAILED,
  payload: {
    id,
    error,
  },
});