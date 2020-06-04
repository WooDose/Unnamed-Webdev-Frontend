import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    delay,
    select,
  } from 'redux-saga/effects';
  import { normalize } from 'normalizr';
  
  import { API_BASE_URL } from '../settings';
  import * as selectors from '../reducers';
  import * as actions from '../actions/notes';
  import * as types from '../types/notes';
  import * as schemas from '../schemas/notes';
  
  
  function* fetchNotes(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/note/1/view_all/`,
          {
            method: 'GET',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
          const jsonResult = yield response.json();
          const {
            entities: { notes },
            result,
          } = normalize(jsonResult, schemas.notes);
  
          yield put(
            actions.completeFetchingNotes(
              notes,
              result,
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
        }
      }
    } catch (error) {
      console.log("ERROR", error)
    }
  }
  
  export function* watchNotesFetch() {
    yield takeEvery(
      types.NOTES_FETCH_STARTED,
      fetchNotes,
    );
  }
  
  function* addNote(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/note/`,
          {
            method: 'POST',
            body: JSON.stringify(action.payload),
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 201) {
          const jsonResult = yield response.json();
          yield put(
            actions.completeAddingNote(
              action.payload.id,
              jsonResult,
            ),
          );

        } else {

        }
      }
    } catch (error) {
      console.log("ERROR")
    }
  }
  
  export function* watchAddNote() {
    yield takeEvery(
      types.NOTE_ADD_STARTED,
      addNote,
    );
  }
  
  function* removeNote(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/note/${action.payload.id}/disable/`,
          {
            method: 'PATCH',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
          yield put(actions.completeRemovingNote());

        } else {
          alert("ERROR: You cannot remove posts made by other people")
        }
      }
    } catch (error) {
      alert("ERROR", error)
    }
  }
  
  export function* watchRemoveNote() {
    yield takeEvery(
      types.NOTE_REMOVE_STARTED,
      removeNote,
    );
  }


  function* likeNote(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/note/${action.payload.id}/like/`,
          {
            method: 'PATCH',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
          yield put(actions.completeLikingNote());

        } else {
          alert("ERROR: You literally messed up the like function. What a champ.")
        }
      }
    } catch (error) {
      console.log("ERROR", error)
    }
  }
  
  export function* watchLikeNote() {
    yield takeEvery(
      types.NOTE_LIKE_STARTED,
      likeNote,
    );
  }

