// On importe les hooks originaux de react-redux
import { useSelector, useDispatch } from 'react-redux';
// On importe les types que l'on a créer dans notre store
import { RootState, AppDispatch } from '../store/store';

// On exporte ces hooks personnalisés (avec les types du store ) pour pouvoir les rendre accessible dans toute l'app. On utilisera donc ces deux ci-dessous au lieu d'utiliser les hooks originaux.
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
