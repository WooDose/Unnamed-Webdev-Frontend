import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

// import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/notes';


const NoteRow = ({ id, title,  contents, likes, uploader, upload_date,  onDelete, onLike,onEdit, isConfirmed = false }) => {
  return (
  <tr className={!isConfirmed ? 'note-row--pending' : ''}>
    <td>{ title }</td>
    <td>{ contents }</td>
    <td>{ likes }</td>
    <td>{ uploader }</td>

    <td>
      {
        isConfirmed && (
          <button
            onClick={onDelete}
          >
            {'Disable'}
          </button>
        )
      }
    </td>
    <td>
      {
        isConfirmed && (
          <button
            onClick={onLike}
          >
            {'Like'}
          </button>
        )
      }
    </td>
    {/* <td>
      {
        isConfirmed && (
          <button type="submit" onClick={
            () => {
              onEdit(id, contents_new);
            }
          }>
            {'Edit'}
          </button>
        )
      }
    </td> */}
  </tr>
);
    }
export default connect(
  (state, { id }) => ({
    ...selectors.getNote(state, id),
  }),
  (dispatch, { id, contents }) => ({
    onDelete() {
      dispatch(actions.startRemovingNote(id));
    },
    onLike() {
      dispatch(actions.startLikingNote(id));
    },
    // onEdit() {
    //   // dispatch(actions.startEditingNote({
    //   //   id,
    //   //   contents,
    //   // }));
    // }
  }),
)(NoteRow);