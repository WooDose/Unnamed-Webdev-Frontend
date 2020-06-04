import React, {Fragment } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as
  Redirect,
} from "react-router-dom";

import * as selectors from '../../reducers';
import * as actions from '../../actions/auth';
// import './styles.css';

import {Field, reduxForm} from 'redux-form';


const LoginForm = ({
  isLoading = false,
  error = null,
  isAuthenticated= false,
  handleSubmit,
}) => {  
  if (isAuthenticated) {
    return (
      <Redirect to='/Mainscreen' />
    );
  }

  
  return (
      <Fragment>
        <form className="login-wrapper" onSubmit={handleSubmit}> 
          {
            error && (
              <p>
                <strong>{ error }</strong>
              </p>
            )
          }
          <p>
            <Field className="FormField_InputLogin"
              name="username"
              type="text"
              placeholder="user"
              component="input"
            />
          </p>
          <p>
            <Field className="FormField_InputLogin"
              name="password"
              type="password"
              placeholder="Password"
              component="input"
            />
          </p>
          <p>
            {
              isLoading ? (
                <strong>{'Getting you Set up...'}</strong>
              ) : (
                <button className="SubmitButtonLogin" type="submit" >
                  {'Login'}
                </button>
              )
            }
          </p>
          </form>
      </Fragment>
  ); 
} 


export default connect(
  state => ({
    isLoading: selectors.getIsAuthenticating(state),
    error: selectors.getAuthenticatingError(state),
    isAuthenticated: selectors.isAuthenticated(state),
    authName: selectors.getAuthUsername(state),
  }),
)(
  reduxForm({
    form:'loginform',
    onSubmit({username, password},  dispatch){
      dispatch(actions.startLogin(username, password));
    },
  })(LoginForm)
);