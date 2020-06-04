  
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

// import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/images';
import ImageRow from '../ImageRow';


const ImageList = ({ images, isLoading, onLoad }) => {
  useEffect(onLoad, []);
  return (
    <Fragment>
      {
        images.length === 0 && !isLoading && (
          <p>{'No Images have been uploaded. Except that is a lie because images can only be disabled.'}</p>
        )
      }
      {
        isLoading && (
          <p>{'Fetching images...'}</p>
        )
      }
      {
        images.length > 0 && !isLoading && (
          <table>
            <tbody>
              {
                images.map(({ id }) => <ImageRow key={id} id={id} />)
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
    images: selectors.getImages(state),
    isLoading: selectors.isFetchingImages(state),
  }),
  dispatch => ({
    onLoad() {
      dispatch(actions.startFetchingImages());
    },
  }),
)(ImageList);