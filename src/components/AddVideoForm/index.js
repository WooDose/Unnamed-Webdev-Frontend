import { v4 as uuidv4 } from 'uuid';
import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

import * as selectors from '../../reducers';
import * as actions from '../../actions/videos';


const VideoForm = ({
  onSubmit,
  isLoading,
}) => {
  const [name, changeName] = useState('');
  const [directory, changeDirectory] = useState('');
  const [caption, changeCaption] = useState('');
  return (
    <div>
      <h3>{'Upload New Video:'}</h3>
      <p>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => changeName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Directory"
          value={directory}
          onChange={e => changeDirectory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={e => changeCaption(e.target.value)}
        />
      </p>
      <p>
        {
          isLoading ? (
            <strong>{'Submitting...'}</strong>
          ) : (
            <button type="submit" onClick={
              () => {
                onSubmit(name, directory, caption);
                changeName('');
                changeDirectory('');
                changeCaption('');
              }
            }>
              {'Submit'}
            </button>
          )
        }
      </p>
    </div>
  );
} 


export default connect(
  state => ({
    isLoading: false,
  }),
  dispatch => ({
    onSubmit(name, directory, caption) {
      dispatch(
        actions.startAddingVideo({
          id: uuidv4(),
          name,
          directory,
          caption,
          likes: 0,
        }),
      );
    },
  }),
)(VideoForm);