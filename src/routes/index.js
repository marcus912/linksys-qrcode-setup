// import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
// import Loadable from 'ui-component/Loadable';
import AmplifyLogin from '../views/pages/amplify/AmplifyLogin';

// const PagesLanding = Loadable(lazy(() => import('views/pages/landing')));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([{ path: '/', element: <AmplifyLogin /> }, AuthenticationRoutes, LoginRoutes, MainRoutes]);
}
