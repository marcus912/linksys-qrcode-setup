import {lazy} from 'react';

// project imports
import GuestGuard from 'utils/route-guard/GuestGuard';
import MinimalLayout from 'layout/MinimalLayout';
import NavMotion from 'layout/NavMotion';
import Loadable from 'ui-component/Loadable';

// login routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const AuthForgotPassword = Loadable(lazy(() => import('views/pages/authentication/authentication3/ForgotPassword3')));
const AuthResetPassword = Loadable(lazy(() => import('views/pages/authentication/authentication3/ResetPassword3')));
const AuthCheckMail = Loadable(lazy(() => import('views/pages/authentication/authentication3/CheckMail3')));

// Linksys
const LinksysSetup = Loadable(lazy(() => import('views/pages/linksys/LinksysRouterSetup')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: (
        <NavMotion>
            <GuestGuard>
                <MinimalLayout/>
            </GuestGuard>
        </NavMotion>
    ),
    children: [
        {
            path: '/login',
            element: <AuthLogin/>
        },
        {
            path: '/register',
            element: <AuthRegister/>
        },
        {
            path: '/forgot',
            element: <AuthForgotPassword/>
        },
        {
            path: '/reset-password',
            element: <AuthResetPassword/>
        },
        {
            path: '/check-mail',
            element: <AuthCheckMail/>
        },
        {
            path: 'setup',
            element: <LinksysSetup/>
        }
    ]
};

export default LoginRoutes;
