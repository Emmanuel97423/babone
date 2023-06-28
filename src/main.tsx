import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  checkUpdate,
  installUpdate,
  onUpdaterEvent
} from '@tauri-apps/api/updater';
import { relaunch } from '@tauri-apps/api/process';
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
import ErpDefaultTemplate from '@/components/templates/Erp/ErpDefaultTemplate';
import ProductListPage from './pages/Erp/ProductManagement';
import DashboardErp from './pages/Erp/DashboardErp';
import OrderPage from './pages/Erp/Order';
import AddProduct from './pages/Erp/ProductManagement/Add';
import UpdateProduct from './pages/Erp/ProductManagement/Update';
import AddOptions from '@/pages/Erp/ProductManagement/AddOptions';
import VariantsPage from '@/pages/Erp/ProductManagement/VariantsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: '/erp',
    element: <ErpDefaultTemplate />,
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

const checkForUpdates = async () => {
  console.log('Checking for updates...');
  const unlisten = await onUpdaterEvent(({ error, status }) => {
    // This will log all updater events, including status updates and errors.
    console.log('Updater event', error, status);
  });

  try {
    // const manifestFetch = await fetch(
    //   'https://raw.githubusercontent.com/Emmanuel97423/babone/master/update-manifest.json'
    // );
    // const manifestJson = await manifestFetch.json();
    // console.log('Fetched manifest:', manifestJson);
    const { shouldUpdate, manifest } = await checkUpdate();
    console.log('manifest:', manifest);
    console.log('shouldUpdate:', shouldUpdate);

    if (shouldUpdate) {
      // You could show a dialog asking the user if they want to install the update here.
      console.log(
        `Installing update ${manifest?.version}, ${manifest?.date}, ${manifest?.body}`
      );

      // Install the update. This will also restart the app on Windows!
      await installUpdate();

      // On macOS and Linux you will need to restart the app manually.
      // You could use this step to display another confirmation dialog.
      await relaunch();
    }
  } catch (error) {
    console.error(error);
  }

  // you need to call unlisten if your handler goes out of scope, for example if the component is unmounted.
  unlisten();
};

checkForUpdates();

// store.dispatch(fetchProducts());
// store.dispatch(extendedApiSlice.endpoints.getProductsList.initiate(undefined));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
