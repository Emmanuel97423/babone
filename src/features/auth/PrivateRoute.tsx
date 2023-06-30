import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // ou autre bibliothèque d'état global
import { RootState } from '@/store/store';

interface PrivateRouteProps {
  children: ReactNode;
}
export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // Utilisez un sélecteur Redux ou une autre méthode pour obtenir l'état d'authentification.
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isLogined
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
