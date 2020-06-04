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
  import * as actions from '../actions/videos';
  import * as types from '../types/videos';
  import * as schemas from '../schemas/videos';
  
  
  function* fetchVideos(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/video/1/view_all/`,
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
            entities: { videos },
            result,
          } = normalize(jsonResult, schemas.videos);
  
          yield put(
            actions.completeFetchingVideos(
              videos,
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
  
  export function* watchVideosFetch() {
    yield takeEvery(
      types.VIDEOS_FETCH_STARTED,
      fetchVideos,
    );
  }
  
  function* addVideo(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/video/`,
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
            actions.completeAddingVideo(
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
  
  export function* watchAddVideo() {
    yield takeEvery(
      types.VIDEO_ADD_STARTED,
      addVideo,
    );
  }
  
  function* removeVideo(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/video/${action.payload.id}/disable/`,
          {
            method: 'PATCH',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
          yield put(actions.completeRemovingVideo());

        } else {
          alert("ERROR: You cannot remove posts made by other people")
        }
      }
    } catch (error) {
      alert("ERROR", error)
    }
  }
  
  export function* watchRemoveVideo() {
    yield takeEvery(
      types.VIDEO_REMOVE_STARTED,
      removeVideo,
    );
  }


  function* likeVideo(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/video/${action.payload.id}/like/`,
          {
            method: 'PATCH',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
          yield put(actions.completeLikingVideo());

        } else {
          alert("ERROR: You literally messed up the like function. What a champ.")
        }
      }
    } catch (error) {
      console.log("ERROR", error)
    }
  }
  
  export function* watchLikeVideo() {
    yield takeEvery(
      types.VIDEO_LIKE_STARTED,
      likeVideo,
    );
  }

  function* editVideo(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/video/${action.payload.id}/update_caption/`,
          {
            method: 'PATCH',
            body: JSON.stringify(action.payload.new_caption),
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
          yield put(actions.completeLikingVideo());

        } else {
          alert("ERROR: You literally messed up the like function. What a champ.")
        }
      }
    } catch (error) {
      console.log("ERROR", error)
    }
  }
  
  export function* watchEditVideo() {
    yield takeEvery(
      types.VIDEO_EDIT_STARTED,
      editVideo,
    );
  }