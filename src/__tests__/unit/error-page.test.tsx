import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  RouterProvider,
  createMemoryRouter,
  BrowserRouter
} from 'react-router-dom';
import ErrorPage from '@/error-page';
import Erp from '@/error-page';
import App from '@/App';

describe('error-page', async () => {
  test('should render error page', () => {
    const routes = [
      {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />
      },
      {
        path: '/erp',
        element: <Erp />
      }
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/', '/ee'],
      initialIndex: 1
    });

    render(<RouterProvider router={router} />);
    const errorMessage = screen.getByText(
      'Sorry, an unexpected error has occurred.'
    );

    const errorPage = screen.getByTestId('error-page');
    expect(errorPage).toBeTruthy();
    expect(errorMessage).toBeTruthy();
  });
});
