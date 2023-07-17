import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PrivateRoute } from './features/auth/PrivateRoute';
import { store } from './store/store';
// import { extendedApiSlice } from './features/product/productSlice';
// import { fetchProducts } from './features/product/productSlice';

import { Provider } from 'react-redux';
import ErrorPage from './error-page';
import Home from './pages/Home';
import Erp from './pages/Erp';
import Login from '@/pages/Auth/Login';
import Signup from '@/pages/Auth/Signup';
import SignupSuccess from '@/pages/Auth/Signup/SignupSuccess';
import ErpDefaultTemplate from '@/components/templates/Erp/ErpDefaultTemplate';
import ProductListPage from './pages/Erp/ProductManagement';
import DashboardErp from './pages/Erp/DashboardErp';
import OrderPage from './pages/Erp/Order';
import AddProduct from './pages/Erp/ProductManagement/Add';
import UpdateProduct from './pages/Erp/ProductManagement/Update';
import AddOptions from '@/pages/Erp/ProductManagement/AddOptions';
import VariantsPage from '@/pages/Erp/ProductManagement/VariantsPage';
import StorePage from '@/pages/Store';
import StoreList from '@/features/store/StoresList';

const router = createBrowserRouter([
  {
    path: '/apps',
    element: <App />,
    errorElement: <ErrorPage />
  },

  {
    path: '/auth/login',
    element: <Login />
  },
  {
    path: '/auth/signup',
    element: <Signup />
  },
  {
    path: '/auth/signup/success',
    element: <SignupSuccess />
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <StorePage />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/stores',
        element: <StoreList />
      }
    ]
  },
  {
    path: '/erp',
    element: (
      <PrivateRoute>
        <Erp />
      </PrivateRoute>
    ),
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
        path: '/erp/products-management/add',
        element: <AddProduct />
      },
      {
        path: '/erp/products-management/update/:id',
        element: <UpdateProduct />
      },
      {
        path: '/erp/products-management/variants',
        element: <VariantsPage />
      },
      {
        path: '/erp/orders',
        element: <OrderPage />
      },
      {
        path: '/erp/options',
        element: <AddOptions />
      }
    ]
  }
]);

// store.dispatch(fetchProducts());
// store.dispatch(extendedApiSlice.endpoints.getProductsList.initiate(undefined));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
