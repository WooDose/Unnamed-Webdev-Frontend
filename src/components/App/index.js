import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from '../../store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routerActions } from 'react-router-redux';
import LoginForm from '../LoginForm';

import Mainscreen from './Mainscreen';
// import PosterView from './PosterView'
import { 
  connectedRouterRedirect,
  connectedReduxRedirect,
} from 'redux-auth-wrapper/history4/redirect';
import * as selectors from '../../reducers';

import TokenRefresh from '../TokenRefresh';


const { store, persistor } = configureStore();
const UserIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/',
  authenticatedSelector: selectors.isAuthenticated,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'userIsAuthenticated',
});
const routes = [
  {
      path: '/',
      exact: true,
      component: LoginForm,
  },
  {
    path: '/Mainscreen',
    exact: true,
    component: UserIsAuthenticated(Mainscreen),
  },
  // {
  //   path: '/Poster',
  //   exact: true,
  //   component: UserIsAuthenticated(PosterView)
  // }
];
const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
      <div className="App" >
        <Switch>
        {
            routes.map( route => (
                <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                />  
            ))
        }
        </Switch>   
        <TokenRefresh reviewTime={3600000} /> 
      </div>
    </Router>
    </PersistGate>
  </Provider>
);


export default App;