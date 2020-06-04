import { fork, all } from 'redux-saga/effects';

import {
  watchLoginStarted,
  watchRefreshTokenStarted,
} from './auth';

import {
  watchImagesFetch,
  watchAddImage,
  watchRemoveImage,
  watchLikeImage,
  watchEditImage,
} from './images'

import {
  watchVideosFetch,
  watchAddVideo,
  watchRemoveVideo,
  watchLikeVideo,
  watchEditVideo,
} from './videos'

import {
  watchLinksFetch,
  watchAddLink,
  watchRemoveLink,
  watchLikeLink,
  watchEditLink,
} from './links'


import {
  watchNotesFetch,
  watchAddNote,
  watchRemoveNote,
  watchLikeNote,
} from './notes'

function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchRefreshTokenStarted),
    fork(watchImagesFetch),
    fork(watchAddImage),
    fork(watchRemoveImage),
    fork(watchLikeImage),
    fork(watchEditImage),
    fork(watchVideosFetch),
    fork(watchAddVideo),
    fork(watchRemoveVideo),
    fork(watchLikeVideo),
    fork(watchEditVideo),
    fork(watchLinksFetch),
    fork(watchAddLink),
    fork(watchRemoveLink),
    fork(watchLikeLink),
    fork(watchEditLink),
    fork(watchNotesFetch),
    fork(watchAddNote),
    fork(watchRemoveNote),
    fork(watchLikeNote),
  ]);
}


export default mainSaga;