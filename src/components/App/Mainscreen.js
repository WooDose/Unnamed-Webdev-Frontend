import React, {} from 'react';
import { connect } from 'react-redux';
import {
    Redirect  } from "react-router-dom";
import * as selectors from '../../reducers';
import TokenRefresh from '../TokenRefresh';
import LogoutButton from '../LogoutButton';
import AddImageForm from '../AddImageForm';
import LoginForm from '../LoginForm';
import ImageList from '../ImageList';
import VideoList from '../VideoList';
import AddVideoForm from '../AddVideoForm';
import LinkList from '../LinkList';
import AddLinkForm from '../AddLinkForm';
import NoteList from '../NoteList';
import AddNoteForm from '../AddNoteForm';
function Mainscreen(isAuthenticated){
    
    if (!isAuthenticated) {
        return (
          <Redirect to='/'/>
        );
    }
      
    if (isAuthenticated){
      return (
      <div className="objects-wrapper">
      <LogoutButton/>
      <h1>Welcome to the site lol</h1>
      <h2> Images: </h2>
      <ImageList/>
      <AddImageForm/>
      <h2> Videos: </h2>
      <VideoList/>
      <AddVideoForm/>
      <h2> Links: </h2>
      <LinkList/>
      <AddLinkForm/>
      <h2> Notes: </h2>
      <NoteList/>
      <AddNoteForm/>
      <TokenRefresh reviewTime={3600000} />   
    </div>);
    }
    return (
      <div className="objects-wrapper" >
      <LoginForm/>
      <h1>Welcome to the site lol</h1>
      <AddImageForm/>
      <TokenRefresh reviewTime={3600000} />   
    </div>

    )
}
export default connect(
    state => ({
      isAuthenticated: selectors.isAuthenticated(state),
    }),
    () => ({
     
    }),
  )(Mainscreen);