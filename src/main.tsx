import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './store/store';
// import { extendedApiSlice } from './features/product/productSlice';
import { fetchProducts } from './features/product/productSlice';

import { Provider } from 'react-redux';
import ErrorPage from './error-page';
import Home from './pages/Home';
import Erp from './pages/Erp';
import ProductListPage from './pages/Erp/ProductManagement';
import DashboardErp from './pages/Erp/DashboardErp';
import OrderPage from './pages/Erp/Order';
import AddProduct from './pages/Erp/ProductManagement/Add';
import { setupMockServer } from './__mock__/api/server';

setupMockServer();

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
        element: <ProductListPage />,
        children: []
      },
      {
        path: '/erp/products-management/add',
        element: <AddProduct />
      },
      {
        path: '/erp/orders',
        element: <OrderPage />
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
