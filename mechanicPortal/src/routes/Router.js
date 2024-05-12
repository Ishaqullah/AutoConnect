import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import { useParams } from 'react-router-dom';

const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const MechanicList = Loadable(lazy(() => import('../views/mechanicManagement/UpdateProfileForm')))
const Chat = Loadable(lazy(() => import('../views/chat/Chat')))
const UserList = Loadable(lazy(() => import('../views/userManagement/UserList')))
const Feedback = Loadable(lazy(() => import('../views/userManagement/Reviews')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const isLoggedIn = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};
const id=localStorage.getItem('mechanicId');
const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: isLoggedIn() ? <Navigate to={`/mechanic/dashboard/${id}`} /> : <Navigate to="/auth/login" /> },
      { path: '/mechanic/dashboard/:id', exact: true, element: <Dashboard /> },
      { path: '/mechanic/profile/:id', exact: true, element: <MechanicList /> },
      { path: '/mechanic/appointments/:id', exact: true, element: <Chat /> },
      { path: '/mechanic/listOfUsers/:id', exact: true, element: <UserList /> },
      { path: '/mechanic/reviews/:id', exact: true, element: <Feedback /> },
      { path: '*', element: <Navigate to="/auth/404/:id" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
