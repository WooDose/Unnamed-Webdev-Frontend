import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

// import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/videos';


const VideoRow = ({ id, name, directory, caption, likes, uploader, upload_date,  onDelete, onLike,onEdit, isConfirmed = false }) => {
  const [caption_new, changeCaption] = useState('');
  return (
  <tr className={!isConfirmed ? 'video-row--pending' : ''}>
    <td>{ name }</td>
    <td><button>Play</button></td>
    <td><input
          type="text"
          placeholder={ caption }
          value={ caption_new  }
          onChange={e => changeCaption(e.target.value)}
        /></td>
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
              onEdit(id, caption_new);
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
    ...selectors.getVideo(state, id),
  }),
  (dispatch, { id, caption }) => ({
    onDelete() {
      dispatch(actions.startRemovingVideo(id));
    },
    onLike() {
      dispatch(actions.startLikingVideo(id));
    },
    // onEdit() {
    //   // dispatch(actions.startEditingVideo({
    //   //   id,
    //   //   caption,
    //   // }));
    // }
  }),
)(VideoRow);