  
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

// import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/links';
import LinkRow from '../LinkRow';


const LinkList = ({ links, isLoading, onLoad }) => {
  useEffect(onLoad, []);
  return (
    <Fragment>
      {
        links.length === 0 && !isLoading && (
          <p>{'No Links have been uploaded. Except that is a lie because links can only be disabled.'}</p>
        )
      }
      {
        isLoading && (
          <p>{'Fetching links...'}</p>
        )
      }
      {
        links.length > 0 && !isLoading && (
          <table>
            <tbody>
              {
                links.map(({ id }) => <LinkRow key={id} id={id} />)
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
    links: selectors.getLinks(state),
    isLoading: selectors.isFetchingLinks(state),
  }),
  dispatch => ({
    onLoad() {
      dispatch(actions.startFetchingLinks());
    },
  }),
)(LinkList);