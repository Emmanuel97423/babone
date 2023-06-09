import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import App from '@/App';
import Erp from '@/pages/Erp';

describe('Render routes', () => {
  test('renders home page', () => {
    const routes = [
      {
        path: '/',
        element: <App />
      }
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ['/', '/'],
      initialIndex: 1
    });

    render(<RouterProvider router={router} />);
    const homePage = screen.getByText('Babone project');
    expect(homePage).toBeInTheDocument();
  });
});
