import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

// Ce composant va nous permettre de créer des routes protégées, pour les utilisateurs non connectés, mais aussi (peut-être) pour le rôle administrateur si on arrive à le mettre en place
// Dans ce composant on prend le state "logged" du store, on regarde s'il est vrai ( ce qui signifie que l'utilisateur est connecté ), si c'est le cas on donne accès aux routes, sinon on redirige vers "/".
function ProtectedRoute() {
  const logged = useAppSelector((store) => store.profile.logged);
  return logged ? <Outlet /> : <Navigate to="/" />;
}
export default ProtectedRoute;
