  
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

// import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/notes';
import NoteRow from '../NoteRow';


const NoteList = ({ notes, isLoading, onLoad }) => {
  useEffect(onLoad, []);
  return (
    <Fragment>
      {
        notes.length === 0 && !isLoading && (
          <p>{'No Notes have been uploaded. Except that is a lie because notes can only be disabled.'}</p>
        )
      }
      {
        isLoading && (
          <p>{'Fetching notes...'}</p>
        )
      }
      {
        notes.length > 0 && !isLoading && (
          <table>
            <tbody>
              {
                notes.map(({ id }) => <NoteRow key={id} id={id} />)
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
    notes: selectors.getNotes(state),
    isLoading: selectors.isFetchingNotes(state),
  }),
  dispatch => ({
    onLoad() {
      dispatch(actions.startFetchingNotes());
    },
  }),
)(NoteList);