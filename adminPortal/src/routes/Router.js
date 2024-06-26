import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import { useParams } from 'react-router-dom';

const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const MechanicList = Loadable(lazy(() => import('../views/mechanicManagement/MechanicList')))
const Feedback = Loadable(lazy(()=>import('../views/feedback/Feedback')))
const UserList = Loadable(lazy(() => import('../views/userManagement/UserList')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const MechanicReviews = Loadable(lazy(()=>import('../views/mechanicManagement/MechanicReviews')))
const isLoggedIn = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};
const adminId=localStorage.getItem('adminId');
const Router = [
  {
    path: '/',
    element: <FullLayout /> ,
    children: [
      { path: '/', element: isLoggedIn() ? <Navigate to={`/dashboard/${adminId}`}/>: <Navigate to="/auth/login" /> },
      { path: '/dashboard/:id', exact: true, element: <Dashboard /> },
      { path: '/mechanicManagment/listOfMechanics/:id', exact: true, element: <MechanicList /> },
      { path: '/feedback/:id', exact: true, element: <Feedback /> },
      { path: '/userManagment/listOfUsers/:id', exact: true, element: <UserList /> },
      { path: '/mehcanicManagement/MechanicReviews/:id', exact: true, element: <MechanicReviews /> },
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
