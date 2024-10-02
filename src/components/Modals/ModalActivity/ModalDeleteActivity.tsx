import axios from 'axios';
import { Activities } from '../../../@types';
import { useAppDispatch } from '../../../hooks/redux';
import { updateFavorites } from '../../../store/reducers/profileReducer';

interface ModalDeleteActivityProps {
  setModalType: React.Dispatch<
    React.SetStateAction<'edit' | 'delete' | 'add' | null>
  >;
  setActivityId: React.Dispatch<React.SetStateAction<number | null>>;
  setMyActivities: React.Dispatch<React.SetStateAction<Activities[]>>;
  id: number;
}

function ModalDeleteActivity({
  setModalType,
  setActivityId,
  setMyActivities,
  id,
}: ModalDeleteActivityProps) {
  const dispatch = useAppDispatch();
  async function handlerDelete(): Promise<void> {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/csrf-token`,
        {
          withCredentials: true,
        }
      );

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/profil/activity/${id}`,
        {
          headers: {
            'x-csrf-token': response.data.csrfToken,
          },
          withCredentials: true,
        }
      );
      setMyActivities((prev) => prev.filter((activity) => activity.id !== id));
      dispatch(updateFavorites(id));
      setActivityId(null);
      setModalType(null);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=" absolute  w-screen flex justify-center items-center h-screen left-0 top-0">
      <div className="z-50 w-2/5 min-w-80 min-h-2/5 fixed  bg-lightgrey rounded-md p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-montserrat text-3xl font-semibold italic">
            Suppression d&apos;une activité
          </span>
          <button
            onClick={() => {
              setActivityId(null);
              setModalType(null);
            }}
            type="button"
            className="btn btn-circle btn-outline"
          >
            <svg
              aria-label="close"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col mb-4">
          <div className="label">
            <label htmlFor="delete" className="font-hind text-xl font-semibold">
              Voulez-vous vraiment supprimer cette activité?
            </label>
          </div>
        </div>
        <div className="flex flex-col">
          <button
            type="submit"
            className="btn btn-success text-base text-white mt-4 w-1/4 mx-auto"
            onClick={handlerDelete}
          >
            Oui
          </button>
          <button
            type="submit"
            className="btn btn-error text-base text-white mt-4 w-1/4 mx-auto"
            onClick={() => {
              setActivityId(null);
              setModalType(null);
            }}
          >
            Non
          </button>
        </div>
      </div>
    </div>
  );
}
export default ModalDeleteActivity;
