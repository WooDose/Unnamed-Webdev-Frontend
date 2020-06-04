import { combineReducers } from 'redux';

import auth, * as authSelectors from './auth';
import images, * as imageSelectors from './images'
import videos, * as videoSelectors from './videos'
import links, * as linkSelectors from './links'
import notes, * as noteSelectors from './notes'
import {reducer as formReducer} from 'redux-form';


const reducer = combineReducers({
  auth,
  images,
  videos,
  links,
  notes,
  form: formReducer
});


export default reducer;

export const getAuthToken = state => authSelectors.getAuthToken(state.auth);
export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth);
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.auth);
export const isAuthenticated = state => getAuthToken(state) != null;
export const getAuthUserID = state => authSelectors.getAuthUserID(state.auth);
export const getAuthExpiration = state => authSelectors.getAuthExpiration(state.auth);
export const getAuthUsername = state => authSelectors.getAuthUsername(state.auth);
export const getIsRefreshingToken = state => authSelectors.getIsRefreshingToken(state.auth);
export const getRefreshingError = state => authSelectors.getRefreshingError(state.auth);

export const getImage = (state, id) => imageSelectors.getImage(state.images, id);
export const getImages = state => imageSelectors.getImages(state.images);
export const isFetchingImages = state => imageSelectors.isFetchingImages(state.images);
export const getFetchingImagesError = state => imageSelectors.getFetchingImagesError(state.images);

export const getVideo = (state, id) => videoSelectors.getVideo(state.videos, id);
export const getVideos = state => videoSelectors.getVideos(state.videos);
export const isFetchingVideos = state => videoSelectors.isFetchingVideos(state.videos);
export const getFetchingVideosError = state => videoSelectors.getFetchingVideosError(state.videos);

export const getLink = (state, id) => linkSelectors.getLink(state.links, id);
export const getLinks = state => linkSelectors.getLinks(state.links);
export const isFetchingLinks = state => linkSelectors.isFetchingLinks(state.links);
export const getFetchingLinksError = state => linkSelectors.getFetchingLinksError(state.links);

export const getNote = (state, id) => noteSelectors.getNote(state.notes, id);
export const getNotes = state => noteSelectors.getNotes(state.notes);
export const isFetchingNotes = state => noteSelectors.isFetchingNotes(state.notes);
export const getFetchingNotesError = state => noteSelectors.getFetchingNotesError(state.notes);