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
  import * as actions from '../actions/posters';
  import * as types from '../types/posters';
  import * as schemas from '../schemas/posters';
  
  
  function* fetchPosterMessages(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/poster/${action.payload.id}/messages/`,
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
            entities: { posterMessages },
            result,
          } = normalize(jsonResult, schemas.posterMessages);
  
          yield put(
            actions.completeFetchingPosterMessages(
              posterMessages,
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
  
  export function* watchPosterMessagesFetch() {
    yield takeEvery(
      types.VIDEOS_FETCH_STARTED,
      fetchPosterMessages,
    );
  }
  
  function* addPosterMessage(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/message/`,
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
            actions.completeAddingPosterMessage(
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
  
  export function* watchAddPosterMessage() {
    yield takeEvery(
      types.VIDEO_ADD_STARTED,
      addPosterMessage,
    );
  }
  
  function* removePosterMessage(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/poster/${action.payload.id}/delete/`,
          {
            method: 'DELETE',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
          yield put(actions.completeRemovingPosterMessage());

        } else {
          alert("ERROR: You cannot remove Messages for other people")
        }
      }
    } catch (error) {
      alert("ERROR", error)
    }
  }
  
  export function* watchRemovePosterMessage() {
    yield takeEvery(
      types.VIDEO_REMOVE_STARTED,
      removePosterMessage,
    );
  }


