import { motion } from 'framer-motion';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isInclude from '../utils/isInclude';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  addToFavorites,
  deleteFromFavorites,
} from '../store/reducers/profileReducer';

interface HeartProps {
  activityId: number;
  setModalSignin: React.Dispatch<React.SetStateAction<boolean>>;
}

function Heart({ activityId, setModalSignin }: HeartProps) {
  const myFavorites = useAppSelector((store) => store.profile.myFavorites);
  const logged = useAppSelector((store) => store.profile.logged);
  const dispatch = useAppDispatch();

  async function handlerFavorites(id: number): Promise<void> {
    if (logged) {
      if (isInclude(myFavorites, id)) {
        await dispatch(deleteFromFavorites({ id }));
      } else {
        await dispatch(addToFavorites({ id }));
      }
    } else {
      setModalSignin((modal) => !modal);
    }
  }
  return (
    <button
      onClick={() => handlerFavorites(activityId)}
      type="button"
      aria-label="Ajouter / supprimer des favoris"
    >
      <motion.div
        animate={{
          scale: isInclude(myFavorites, activityId)
            ? [1, 1.5, 0.9, 1]
            : [1, 0.8, 1.1, 1],
        }}
        transition={{ duration: 0.4 }}
      >
        <FontAwesomeIcon
          icon={faHeart}
          className={
            isInclude(myFavorites, activityId)
              ? 'text-newgreen h-6  lg:h-8 '
              : 'text-black/40 h-6  lg:h-8'
          }
        />
      </motion.div>
    </button>
  );
}
export default Heart;
