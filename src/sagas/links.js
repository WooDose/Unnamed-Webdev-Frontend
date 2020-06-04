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
  import * as actions from '../actions/links';
  import * as types from '../types/links';
  import * as schemas from '../schemas/links';
  
  
  function* fetchLinks(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/link/1/view_all/`,
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
            entities: { links },
            result,
          } = normalize(jsonResult, schemas.links);
  
          yield put(
            actions.completeFetchingLinks(
              links,
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
  
  export function* watchLinksFetch() {
    yield takeEvery(
      types.LINKS_FETCH_STARTED,
      fetchLinks,
    );
  }
  
  function* addLink(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/link/`,
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
            actions.completeAddingLink(
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
  
  export function* watchAddLink() {
    yield takeEvery(
      types.LINK_ADD_STARTED,
      addLink,
    );
  }
  
  function* removeLink(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/link/${action.payload.id}/disable/`,
          {
            method: 'PATCH',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
          yield put(actions.completeRemovingLink());

        } else {
          alert("ERROR: You cannot remove posts made by other people")
        }
      }
    } catch (error) {
      alert("ERROR", error)
    }
  }
  
  export function* watchRemoveLink() {
    yield takeEvery(
      types.LINK_REMOVE_STARTED,
      removeLink,
    );
  }


  function* likeLink(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/link/${action.payload.id}/like/`,
          {
            method: 'PATCH',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
          yield put(actions.completeLikingLink());

        } else {
          alert("ERROR: You literally messed up the like function. What a champ.")
        }
      }
    } catch (error) {
      console.log("ERROR", error)
    }
  }
  
  export function* watchLikeLink() {
    yield takeEvery(
      types.LINK_LIKE_STARTED,
      likeLink,
    );
  }

  function* editLink(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/link/${action.payload.id}/update_caption/`,
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
          yield put(actions.completeLikingLink());

        } else {
          alert("ERROR: You literally messed up the edit function. What a champ.")
        }
      }
    } catch (error) {
      console.log("ERROR", error)
    }
  }
  
  export function* watchEditLink() {
    yield takeEvery(
      types.LINK_EDIT_STARTED,
      editLink,
    );
  }