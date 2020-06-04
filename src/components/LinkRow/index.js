import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

// import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/links';


const LinkRow = ({ id, name, url, caption, likes, uploader, upload_date, link_site, onDelete, onLike,onEdit, isConfirmed = false }) => {
  const [caption_new, changeCaption] = useState('');
  return (
  <tr className={!isConfirmed ? 'link-row--pending' : ''}>
    <td>{link_site}: <a href={url}>{ name }</a></td>
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
    ...selectors.getLink(state, id),
  }),
  (dispatch, { id, caption }) => ({
    onDelete() {
      dispatch(actions.startRemovingLink(id));
    },
    onLike() {
      dispatch(actions.startLikingLink(id));
    },
    // onEdit() {
    //   // dispatch(actions.startEditingLink({
    //   //   id,
    //   //   caption,
    //   // }));
    // }
  }),
)(LinkRow);