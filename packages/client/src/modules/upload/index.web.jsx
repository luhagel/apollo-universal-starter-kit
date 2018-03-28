import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { constructUploadOptions } from 'apollo-fetch-upload';
import { translate } from 'react-i18next';

import { MenuItem } from '../../modules/common/components/web';

// Component and helpers
import Upload from './containers/Upload';
import reducers from './reducers';
import resources from './locales';
import Feature from '../connector';

const MenuItemWithI18n = translate('upload')(({ t }) => (
  <MenuItem key="/upload">
    <NavLink to="/upload" className="nav-link" activeClassName="active">
      {t('navLink')}
    </NavLink>
  </MenuItem>
));

export default new Feature({
  catalogInfo: { upload: true },
  route: <Route exact path="/upload" component={Upload} />,
  navItem: <MenuItemWithI18n />,
  reducer: { upload: reducers },
  createFetchOptions: constructUploadOptions,
  localization: { ns: 'upload', resources }
});