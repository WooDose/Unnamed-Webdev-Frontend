import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/links';


const LinkForm = ({
  onSubmit,
  isLoading,
}) => {
  const [name, changeName] = useState('');
  const [url, changeURL] = useState('');
  const [caption, changeCaption] = useState('');
  const [site, changeSite] = useState('');
  return (
    <div>
      <h3>{'Submit New Link:'}</h3>
      <p>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => changeName(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={e => changeURL(e.target.value)}
        />
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={e => changeCaption(e.target.value)}
        />
        <input
          type="text"
          placeholder="Site"
          value={site}
          onChange={e => changeSite(e.target.value)}
        />
      </p>
      <p>
        {
          isLoading ? (
            <strong>{'Submitting...'}</strong>
          ) : (
            <button type="submit" onClick={
              () => {
                onSubmit(name, url, caption, site);
                changeName('');
                changeURL('');
                changeCaption('');
                changeSite('');
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
  () => ({
    isLoading: false,
  }),
  dispatch => ({
    onSubmit(name, url, caption, link_site) {
      dispatch(
        actions.startAddingLink({
          id: uuidv4(),
          name,
          url,
          caption,
          link_site,
          likes: 0,
        }),
      );
    },
  }),
)(LinkForm);