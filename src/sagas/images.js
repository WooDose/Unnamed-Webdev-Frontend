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
  import * as actions from '../actions/images';
  import * as types from '../types/images';
  import * as schemas from '../schemas/images';
  
  
  function* fetchImages(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/image/1/view_all/`,
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
            entities: { images },
            result,
          } = normalize(jsonResult, schemas.images);
  
          yield put(
            actions.completeFetchingImages(
              images,
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
  
  export function* watchImagesFetch() {
    yield takeEvery(
      types.IMAGES_FETCH_STARTED,
      fetchImages,
    );
  }
  
  function* addImage(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/image/`,
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
            actions.completeAddingImage(
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
  
  export function* watchAddImage() {
    yield takeEvery(
      types.IMAGE_ADD_STARTED,
      addImage,
    );
  }
  
  function* removeImage(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/image/${action.payload.id}/disable/`,
          {
            method: 'PATCH',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
          yield put(actions.completeRemovingImage());

        } else {
          alert("ERROR: You cannot remove posts made by other people")
        }
      }
    } catch (error) {
      alert("ERROR", error)
    }
  }
  
  export function* watchRemoveImage() {
    yield takeEvery(
      types.IMAGE_REMOVE_STARTED,
      removeImage,
    );
  }


  function* likeImage(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/image/${action.payload.id}/like/`,
          {
            method: 'PATCH',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
          yield put(actions.completeLikingImage());

        } else {
          alert("ERROR: You literally messed up the like function. What a champ.")
        }
      }
    } catch (error) {
      console.log("ERROR", error)
    }
  }
  
  export function* watchLikeImage() {
    yield takeEvery(
      types.IMAGE_LIKE_STARTED,
      likeImage,
    );
  }

  function* editImage(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/image/${action.payload.id}/update_caption/`,
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
          yield put(actions.completeLikingImage());

        } else {
          alert("ERROR: You literally messed up the like function. What a champ.")
        }
      }
    } catch (error) {
      console.log("ERROR", error)
    }
  }
  
  export function* watchEditImage() {
    yield takeEvery(
      types.IMAGE_EDIT_STARTED,
      editImage,
    );
  }