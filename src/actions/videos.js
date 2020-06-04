import * as types from '../types/videos';


export const startFetchingVideos = () => ({
  type: types.VIDEOS_FETCH_STARTED,
});
export const completeFetchingVideos = (entities, order) => ({
  type: types.VIDEOS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});
export const failFetchingVideos = error => ({
  type: types.VIDEOS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingVideo = Video => ({
  type: types.VIDEO_ADD_STARTED,
  payload: Video,
});
export const completeAddingVideo = (oldId, Video) => ({
  type: types.VIDEO_ADD_COMPLETED,
  payload: {
    oldId,
    Video,
  },
});
export const failAddingVideo = (oldId, error) => ({
  type: types.VIDEO_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const startRemovingVideo = id => ({
  type: types.VIDEO_REMOVE_STARTED,
  payload: {
    id,
  },
});
export const completeRemovingVideo = () => ({
  type: types.VIDEO_REMOVE_COMPLETED,
});
export const failRemovingVideo = (id, error) => ({
  type: types.VIDEO_REMOVE_FAILED,
  payload: {
    id,
    error,
  },
});


export const startLikingVideo = id => ({
  type: types.VIDEO_LIKE_STARTED,
  payload: {
    id,
  },
});
export const completeLikingVideo = () => ({
  type: types.VIDEO_LIKE_COMPLETED,
});
export const failLikingVideo = (id, error) => ({
  type: types.VIDEO_LIKE_FAILED,
  payload: {
    id,
    error,
  },
});


export const startEditingVideo = (id, caption) => ({
  type: types.VIDEO_EDIT_STARTED,
  payload: {
    id,
    caption,
  },
});
export const completeEditingVideo = () => ({
  type: types.VIDEO_EDIT_COMPLETED,
});
export const failEditingVideo = (id, error) => ({
  type: types.VIDEO_EDIT_FAILED,
  payload: {
    id,
    error,
  },
});