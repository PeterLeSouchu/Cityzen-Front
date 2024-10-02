import { Link } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Activities } from '../@types';

import ModalSignin from './Modals/ModalAuthentification/ModalSignin';
import Heart from './Heart';

function Card({ activity }: { activity: Activities }) {
  const [modalSignin, setModalSignin] = useState(false);

  const notifySignin = () => {
    toast.success('Connexion réussie', {
      position: 'top-left',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Slide,
    });
  };
  return (
    <div className="card overflow-hidden bg-white md:w-60 md:h-60 w-36 h-36  flex-shrink-0 shadow-xl  ">
      <Link to={`/activity-detail/${activity.slug}`}>
        <figure className="md:h-40 h-16">
          <img
            src={activity.url_image}
            alt={activity.title}
            className="object-cover h-full w-full"
          />
        </figure>
      </Link>
      <div className="px-4 py-2">
        <Link to={`/activity-detail/${activity.slug}`}>
          <h2 className="font-semibold font-hind text-sm md:text-sm lg:text-sm">
            {activity.title}
          </h2>
        </Link>
        <div className="flex justify-between mt-1">
          <div className="badge bg-grey/50 gap-2 md:p-3 lg:p-4">
            <FontAwesomeIcon
              icon={faStar}
              className="text-yellow-300 md:h-4 lg:h-5"
            />
            <span className="font-hind font-semibold text-sm md:text-base lg:text-lg">
              {activity.avg_rating}
            </span>
          </div>
          <Heart setModalSignin={setModalSignin} activityId={activity.id} />
        </div>
      </div>
      {modalSignin && (
        <ModalSignin notify={notifySignin} setModalSignin={setModalSignin} />
      )}
    </div>
  );
}
export default Card;
