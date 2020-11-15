import React from 'react';


const Menu = React.lazy(() => import('../containers/Menu'));
const Home = React.lazy(() => import('../containers/Home'));
const Overview = React.lazy(() => import('../containers/Overview'));
const Cart = React.lazy(() => import('../containers/Cart'));
const Exit = React.lazy(() => import('../containers/Exit'));



const routes = [
  {
    path: '/:id',
    exact: true,
    name: 'Home',
    component:Home,
  },
  {
    path: '/menu/:id',
    exact: true,
    name: 'Menu',
    component: Menu,
  },
  {
    path: '/overview/:id',
    exact: true,
    name: 'Overview',
    component: Overview,
  },
  {
    path: '/cart/cart',
    exact: true,
    name: 'cart',
    component: Cart,
  },
  {
    path: '/exit/exit',
    exact: true,
    name: 'exit',
    component: Exit,
  },

];


export default routes;
