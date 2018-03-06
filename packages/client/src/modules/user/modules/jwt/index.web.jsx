import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { NavLink, withRouter } from 'react-router-dom';
import ProfileView from '../../common/components/ProfileView';
import { MenuItem } from '../../../../modules/common/components/web';
import Users from '../../common/components/Users';
import UserEdit from '../../common/containers/UserEdit';
import Register from '../../common/containers/Register';
import Login from './containers/Login.web';
import ForgotPassword from '../../common/containers/ForgotPassword';
import ResetPassword from '../../common/containers/ResetPassword';

import {
  AuthRoute,
  IfLoggedIn,
  withUser,
  withLoadedUser,
  withLogout,
  IfNotLoggedIn
} from '../../common/containers/Auth.web';

import Feature from '../../../connector';

function tokenMiddleware(req, options, next) {
  options.headers['x-token'] = window.localStorage.getItem('token');
  options.headers['x-refresh-token'] = window.localStorage.getItem('refreshToken');
  next();
}

function tokenAfterware(res, options, next) {
  const token = options.headers['x-token'];
  const refreshToken = options.headers['x-refresh-token'];
  if (token) {
    window.localStorage.setItem('token', token);
  }
  if (refreshToken) {
    window.localStorage.setItem('refreshToken', refreshToken);
  }
  next();
}

function connectionParam() {
  return {
    token: window.localStorage.getItem('token'),
    refreshToken: window.localStorage.getItem('refreshToken')
  };
}

const ProfileName = withLoadedUser(
  ({ currentUser }) => (currentUser ? currentUser.fullName || currentUser.username : null)
);

const LogoutLink = withRouter(
  withLogout(({ logout, history }) => (
    <a href="#" onClick={() => logout(() => history.push('/'))} className="nav-link">
      Logout
    </a>
  ))
);

export default new Feature({
  route: [
    <AuthRoute exact path="/profile" role={['user', 'admin']} redirect="/login" component={withUser(ProfileView)} />,
    <AuthRoute exact path="/users" redirect="/login" role="admin" component={Users} />,
    <AuthRoute exact path="/users/:id" redirect="/login" role="admin" component={UserEdit} />,
    <AuthRoute exact path="/register" redirectOnLoggedIn redirect="/profile" component={Register} />,
    <AuthRoute
      exact
      path="/login"
      redirectOnLoggedIn
      redirect="/"
      component={withRouter(({ history }) => <Login onLogin={() => history.push('/profile')} />)}
    />,
    <AuthRoute exact path="/forgot-password" redirectOnLoggedIn redirect="/profile" component={ForgotPassword} />,
    <AuthRoute exact path="/reset-password/:token" redirectOnLoggedIn redirect="/profile" component={ResetPassword} />
  ],
  navItem: [
    <MenuItem key="/users">
      <IfLoggedIn role="admin">
        <NavLink to="/users" className="nav-link" activeClassName="active">
          Users
        </NavLink>
      </IfLoggedIn>
    </MenuItem>
  ],
  navItemRight: [
    <IfLoggedIn>
      <MenuItem key="/profile">
        <NavLink to="/profile" className="nav-link" activeClassName="active">
          <ProfileName />
        </NavLink>
      </MenuItem>
      <LogoutLink />
    </IfLoggedIn>,
    <IfNotLoggedIn>
      <NavLink to="/login" className="nav-link" activeClassName="active">
        Sign In
      </NavLink>
    </IfNotLoggedIn>
  ],
  middleware: tokenMiddleware,
  afterware: tokenAfterware,
  connectionParam: connectionParam,
  // eslint-disable-next-line react/display-name
  rootComponentFactory: req => <CookiesProvider cookies={req ? req.universalCookies : undefined} />
});