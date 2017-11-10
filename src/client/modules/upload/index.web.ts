import { constructUploadOptions } from 'apollo-fetch-upload';
import Feature from '../connector';
import UploadView from './components/UploadView.web';
import reducer from './reducers';

export default new Feature({
  route: [{ path: 'upload', component: UploadView, data: { title: 'Upload' } }],
  reducer: { upload: reducer },
  createFetchOptions: constructUploadOptions
});

// import React from 'react';
// import { Route, NavLink } from 'react-router-dom';
// import { NavItem } from 'reactstrap';
// import { constructUploadOptions } from 'apollo-fetch-upload';
//
// // Component and helpers
// import Upload from './containers/Upload';
// import reducers from './reducers';
//
// import Feature from '../connector';
//
// export default new Feature({
//     route: <Route exact path="/upload" component={Upload} />,
//     navItem: (
//         <NavItem>
//             <NavLink to="/upload" className="nav-link" activeClassName="active">
//                 Upload
//             </NavLink>
//         </NavItem>
//     ),
//     reducer: { upload: reducers },
//     createFetchOptions: constructUploadOptions
// });
