import Page404 from "lib/pages/404";
import React from "react";
import type { PathRouteProps } from "react-router-dom";

const Home = React.lazy(() => import("lib/pages/home"));
const Wallet = React.lazy(() => import("lib/pages/wallet"));

export const routes: Array<PathRouteProps> = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/404",
    element: <Page404 />,
  },  
  {
    path: "/wallet",
    element: <Wallet />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [];
