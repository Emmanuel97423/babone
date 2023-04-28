import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';
import Home from './pages/Home';
import Erp from './pages/Erp';
import ProductListPage from './pages/Erp/ProductManagement';
import DashboardErp from './pages/Erp/DashboardErp';
import OrderPage from './pages/Erp/Order';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: '/erp',
    element: <Erp />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: '/erp/dashboard',
        element: <DashboardErp />
      },
      {
        path: '/erp/products-management',
        element: <ProductListPage />
      },
      {
        path: '/erp/orders',
        element: <OrderPage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
