import { Navigate, Route } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import CustomerList from 'src/pages/CustomerList';
import FilingList from 'src/pages/FilingList';
import ApprovalList from 'src/pages/ApprovalList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';

const routes = (user) => [
  {
    path: 'app',
    element: user ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'filings', element: <FilingList /> },
      { path: 'approvals', element: <ApprovalList /> },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      {
        path: 'register',
        element: user ? <Navigate to="app/dashboard" /> : <Register />
      },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate exact to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
