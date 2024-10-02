import {
  faTrash,
  faStar,
  faPen,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Activities } from '../@types';
import ModalDeleteActivity from '../components/Modals/ModalActivity/ModalDeleteActivity';
import ModalEditActivity from '../components/Modals/ModalActivity/ModalEditActivity';
import ModalAddActivity from '../components/Modals/ModalActivity/ModalAddActivity';

function MyActivitiesPage() {
  // On créer un state local qui contient toutes nos activités
  const [myActivities, setMyActivities] = useState<Activities[]>([]);

  // On utilise deux state locaux, un pour le type, et l'autre pour l'id de l'activité
  const [modalType, setModalType] = useState<'edit' | 'delete' | 'add' | null>(
    null
  );
  const [activityId, setActivityId] = useState<number | null>(null);

  // Al'initialisation de lap gae on récupère toutes nos activités créées
  useEffect(() => {
    async function getMyActivities() {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/profil/activity`,
          {
            withCredentials: true,
          }
        );
        setMyActivities(data.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des activités :', error);
      }
    }
    getMyActivities();
  }, []);

  function openModal(type: 'edit' | 'delete', id: number): void {
    setModalType(type);
    setActivityId(id);
  }

  const activities = myActivities.map((myActivity) => {
    return (
      <div
        key={myActivity.id}
        className=" overflow-hidden card bg-white  w-60 h-60 flex-shrink-0 shadow-xl"
      >
        <figure>
          <Link to={`/activity-detail/${myActivity.slug}`}>
            <img
              src={myActivity.url_image}
              alt={myActivity.title}
              className="object-cover"
            />
          </Link>
        </figure>
        <div className="px-4 py-2">
          <Link to={`/activity-detail/${myActivity.slug}`}>
            <h2 className="font-semibold font-hind text-sm md:text-sm lg:text-sm">
              {myActivity.title}
            </h2>
          </Link>
          <div className="flex justify-between mt-1">
            <div className="badge bg-grey/50 gap-2 md:p-3 lg:p-4">
              <FontAwesomeIcon
                icon={faStar}
                className="text-yellow-300 md:h-4 lg:h-5"
              />
              <span className="font-hind font-semibold text-sm md:text-base lg:text-lg">
                {myActivity.avg_rating}
              </span>
            </div>
            <div className="">
              <button
                aria-label="Modifier l'activité"
                onClick={() => openModal('edit', myActivity.id)}
                type="button"
                className="hover:opacity-60 duration-100"
              >
                <FontAwesomeIcon icon={faPen} className="md:h-6 lg:h-8 m-1" />
              </button>
              <button
                aria-label="Supprimer l'activité"
                onClick={() => openModal('delete', myActivity.id)}
                type="button"
                className="hover:opacity-60 duration-100"
              >
                <FontAwesomeIcon icon={faTrash} className="md:h-6 lg:h-8 m-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  function handlerAdd(): void {
    setModalType('add');
  }

  return (
    <div className="flex items-center flex-wrap gap-2 justify-center md:justify-normal p-5">
      {activities.length > 0 ? activities : 'Ajouter une activité'}
      <button
        onClick={handlerAdd}
        type="button"
        className="w-40 md:text-7xl text-5xl hover:rotate-90 transition duration-300"
        aria-label="Ajouter une activité"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>

      {modalType === 'edit' && activityId !== null && (
        <ModalEditActivity
          id={activityId}
          setModalType={setModalType}
          setActivityId={setActivityId}
          setMyActivities={setMyActivities}
        />
      )}

      {modalType === 'delete' && activityId !== null && (
        <ModalDeleteActivity
          id={activityId}
          setModalType={setModalType}
          setActivityId={setActivityId}
          setMyActivities={setMyActivities}
        />
      )}
      {modalType === 'add' && (
        <ModalAddActivity
          setMyActivities={setMyActivities}
          setModalType={setModalType}
        />
      )}
    </div>
  );
}

export default MyActivitiesPage;
