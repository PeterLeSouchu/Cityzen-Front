import axios from 'axios';
import { useState } from 'react';
import { Slide, toast } from 'react-toastify';
import { logout } from '../../../store/reducers/profileReducer';
import { useAppDispatch } from '../../../hooks/redux';
import handlerBackError from '../../../utils/Errors/handlerBackError';
import handlerFrontError from '../../../utils/Errors/handlerFrontError';
import Error from '../../Error';
import { AxiosError } from '../../../@types';

interface ModalDeleteAccountProps {
  setModalDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalDeleteAccount({ setModalDelete }: ModalDeleteAccountProps) {
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState<string>('');

  const notifyDeleteAccount = () => {
    toast.success('Compte supprimé', {
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

  function handlerOldPassword(e: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  async function handlerSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/csrf-token`,
        {
          withCredentials: true,
        }
      );

      await axios.post(
        `${import.meta.env.VITE_API_URL}/profil/unsubscribe`,
        { password },
        {
          headers: {
            'x-csrf-token': response.data.csrfToken,
          },
          withCredentials: true,
        }
      );
      dispatch(logout());
      setModalDelete(false);
      notifyDeleteAccount();
      handlerFrontError('', dispatch);
    } catch (oldError) {
      const error = oldError as AxiosError;
      handlerBackError(error, dispatch);
    }
  }

  return (
    <div className=" absolute  w-screen flex justify-center items-center h-screen left-0 top-0">
      <div className="z-50 w-2/5 min-w-80 min-h-2/5 fixed  bg-lightgrey rounded-md p-4 border-2 border-slate-300">
        <div className="flex justify-between items-center mb-4">
          <span className="font-montserrat text-3xl font-semibold italic">
            Suppression du compte
          </span>
          <button
            onClick={() => {
              setModalDelete(false);
              handlerFrontError('', dispatch);
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
        <Error />
        <form onSubmit={handlerSubmit}>
          <div className="flex flex-col mb-4">
            <div className="label">
              <label
                htmlFor="password-confirm"
                className="font-hind text-xl font-semibold"
              >
                Entrez votre mot de passe
              </label>
            </div>
            <input
              value={password}
              onChange={(e) => handlerOldPassword(e)}
              type="password"
              placeholder="mot de passe"
              id="password-(e) => confirm"
              className="input input-bordered w-full"
            />
          </div>
          <p className="text-center">
            Cette action est irréversible, êtes-vous sûr de vouloir supprimer
            votre compte ?
          </p>
          <div className="flex flex-col">
            <button
              type="submit"
              className="btn btn-success text-base text-white mt-4 w-1/4 mx-auto"
            >
              Oui
            </button>
            <button
              type="button"
              className="btn btn-error text-base text-white mt-4 w-1/4 mx-auto"
              onClick={() => {
                setModalDelete(false);
              }}
            >
              Non
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ModalDeleteAccount;
