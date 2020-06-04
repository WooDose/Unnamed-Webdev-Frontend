import { v4 as uuidv4 } from 'uuid';
import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/notes';


const NoteForm = ({
  onSubmit,
  isLoading,
}) => {
  const [title, changeTitle] = useState('');
  const [content, changeContent] = useState('');
  return (
    <div>
      <h3>{'Upload New Note:'}</h3>
      <p>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => changeTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={e => changeContent(e.target.value)}
        />
      </p>
      <p>
        {
          isLoading ? (
            <strong>{'Submitting...'}</strong>
          ) : (
            <button type="submit" onClick={
              () => {
                onSubmit(title, content);
                changeTitle('');
                changeContent('');
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
    onSubmit(title, contents) {
      dispatch(
        actions.startAddingNote({
          id: uuidv4(),
          title,
          contents,
          likes: 0,
        }),
      );
    },
  }),
)(NoteForm);