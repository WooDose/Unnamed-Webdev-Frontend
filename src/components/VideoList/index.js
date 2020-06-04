  
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

// import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/videos';
import VideoRow from '../VideoRow';


const VideoList = ({ videos, isLoading, onLoad }) => {
  useEffect(onLoad, []);
  return (
    <Fragment>
      {
        videos.length === 0 && !isLoading && (
          <p>{'No Videos have been uploaded. Except that is a lie because videos can only be disabled.'}</p>
        )
      }
      {
        isLoading && (
          <p>{'Fetching videos...'}</p>
        )
      }
      {
        videos.length > 0 && !isLoading && (
          <table>
            <tbody>
              {
                videos.map(({ id }) => <VideoRow key={id} id={id} />)
              }
            </tbody>
          </table>
        )
      }
    </Fragment>
  );
};

export default connect(
  state => ({
    videos: selectors.getVideos(state),
    isLoading: selectors.isFetchingVideos(state),
  }),
  dispatch => ({
    onLoad() {
      dispatch(actions.startFetchingVideos());
    },
  }),
)(VideoList);