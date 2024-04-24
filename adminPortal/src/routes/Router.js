import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import { useParams } from 'react-router-dom';
/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')))
const Icons = Loadable(lazy(() => import('../views/icons/Icons')))
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')))
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const isLoggedIn = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

const Router = [
  {
    path: '/',
    element: isLoggedIn() ? <FullLayout /> : <Navigate to="/auth/login" />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard/:id', exact: true, element: <Dashboard /> },
      { path: '/sample-page/:id', exact: true, element: <SamplePage /> },
      { path: '/icons/:id', exact: true, element: <Icons /> },
      { path: '/ui/typography/:id', exact: true, element: <TypographyPage /> },
      { path: '/ui/shadow/:id', exact: true, element: <Shadow /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
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
