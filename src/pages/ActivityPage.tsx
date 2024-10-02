import {
  faStar,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Slide, toast } from 'react-toastify';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

import { Activities } from '../@types';

import ModalSignin from '../components/Modals/ModalAuthentification/ModalSignin';
import Heart from '../components/Heart';

export const loadActivity = async ({ params }: LoaderFunctionArgs) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/activity/${params.slug}`
    );
    return data.data[0];
  } catch (error: unknown) {
    throw new Error("Oops, les données n'ont pas pu être chargées");
  }
};

function ActivityPage() {
  const activity = useLoaderData() as Activities;

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
    <div className="bg-white py-10 ">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-1 md:flex-2">
            <img
              src={activity.url_image}
              alt={activity.title}
              className="w-full h-50 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-green/20  rounded-md p-1">
          <div className="max-w-4xl mx-auto mt-6 px-4  ">
            <div className="flex items-center justify-between">
              <h1 className="mx-4 md:mx-8 text-3xl font-montserrats text-black">
                {activity.title}
              </h1>
              <div className="flex items-center gap-5">
                <Heart
                  setModalSignin={setModalSignin}
                  activityId={activity.id}
                />
                <div className="badge bg-grey/50 gap-2 md:p-3 lg:p-4 flex">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-yellow-300 md:h-4 lg:h-5"
                  />
                  <span className="font-hind font-semibold text-sm md:text-base lg:text-lg">
                    {activity.avg_rating}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4">
            <p className="mx-4 md:mx-8 mt-4 text-black font-montserrat">
              <FontAwesomeIcon icon={faLocationDot} /> {activity.city_name},{' '}
              {activity.address}, {activity.department_code}
            </p>
            {activity.phone && (
              <p className="mx-4 md:mx-8 mt-4  text-black font-montserrat">
                <FontAwesomeIcon icon={faPhone} /> {activity.phone}
              </p>
            )}
            <p className="mx-4 md:mx-8 mt-6 mb-10 text-black font-montserrat">
              {activity.description}
            </p>
          </div>
        </div>
      </div>
      {modalSignin && (
        <ModalSignin notify={notifySignin} setModalSignin={setModalSignin} />
      )}
    </div>
  );
}

export default ActivityPage;
