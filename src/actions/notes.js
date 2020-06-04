import * as types from '../types/notes';


export const startFetchingNotes = () => ({
  type: types.NOTES_FETCH_STARTED,
});
export const completeFetchingNotes = (entities, order) => ({
  type: types.NOTES_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});
export const failFetchingNotes = error => ({
  type: types.NOTES_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingNote = Note => ({
  type: types.NOTE_ADD_STARTED,
  payload: Note,
});
export const completeAddingNote = (oldId, Note) => ({
  type: types.NOTE_ADD_COMPLETED,
  payload: {
    oldId,
    Note,
  },
});
export const failAddingNote = (oldId, error) => ({
  type: types.NOTE_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const startRemovingNote = id => ({
  type: types.NOTE_REMOVE_STARTED,
  payload: {
    id,
  },
});
export const completeRemovingNote = () => ({
  type: types.NOTE_REMOVE_COMPLETED,
});
export const failRemovingNote = (id, error) => ({
  type: types.NOTE_REMOVE_FAILED,
  payload: {
    id,
    error,
  },
});


export const startLikingNote = id => ({
  type: types.NOTE_LIKE_STARTED,
  payload: {
    id,
  },
});
export const completeLikingNote = () => ({
  type: types.NOTE_LIKE_COMPLETED,
});
export const failLikingNote = (id, error) => ({
  type: types.NOTE_LIKE_FAILED,
  payload: {
    id,
    error,
  },
});

