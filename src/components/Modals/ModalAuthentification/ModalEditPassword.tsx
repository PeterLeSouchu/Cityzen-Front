import axios from 'axios';
import { useState } from 'react';
import { Slide, toast } from 'react-toastify';
import { useAppDispatch } from '../../../hooks/redux';
import handlerFrontError from '../../../utils/Errors/handlerFrontError';
import handlerBackError from '../../../utils/Errors/handlerBackError';
import Error from '../../Error';
import { AxiosError } from '../../../@types';

interface ModalEditPasswordProps {
  setModalPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalEditPassword({ setModalPassword }: ModalEditPasswordProps) {
  const dispatch = useAppDispatch();

  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>('');

  const notifyEditPassword = () => {
    toast.success('Mot de passe modifié', {
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
    setOldPassword(e.target.value);
  }
  function handlerNewPassword(e: React.ChangeEvent<HTMLInputElement>): void {
    setNewPassword(e.target.value);
  }
  function handlerNewPAsswordConfirm(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    setNewPasswordConfirm(e.target.value);
  }

  async function handlerSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    try {
      if (newPassword !== newPasswordConfirm) {
        handlerFrontError('Les mots de passe de correspondent pas', dispatch);
        return;
      }
      if (oldPassword === newPassword) {
        handlerFrontError(
          "Vous devez utiliser un nouveau mot de passe différent de l'ancien",
          dispatch
        );
        return;
      }
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/csrf-token`,
        {
          withCredentials: true,
        }
      );

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/profil/updatePassword`,
        { oldPassword, newPassword, newPasswordConfirm },
        {
          headers: {
            'x-csrf-token': response.data.csrfToken,
          },
          withCredentials: true,
        }
      );
      setModalPassword(false);
      notifyEditPassword();
      handlerFrontError('', dispatch);
    } catch (oldError) {
      const error = oldError as AxiosError;

      handlerBackError(error, dispatch);
    }
  }

  return (
    <div className=" absolute  w-screen flex justify-center items-center h-screen left-0 top-0">
      <div className="z-50 w-2/5 min-w-80 min-h-2/5 fixed max-h-32 overflow-scroll  bg-lightgrey rounded-md p-4 border-2 border-slate-300">
        <div className="flex justify-between items-center mb-4">
          <span className="font-montserrat text-3xl font-semibold italic">
            Modification du mot de passe
          </span>
          <button
            onClick={() => {
              setModalPassword(false);
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
        <form onSubmit={(e) => handlerSubmit(e)}>
          <div className="flex flex-col mb-4">
            <div className="label">
              <label
                htmlFor="password-confirm"
                className="font-hind text-xl font-semibold"
              >
                Entrez votre mot de passe actuel
              </label>
            </div>

            <label
              className="input input-bordered flex items-center gap-2"
              aria-label="password"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                value={oldPassword}
                onChange={(e) => handlerOldPassword(e)}
                type="password"
                placeholder="mot de passe actuel"
                id="password-(e) => confirm"
                className=" w-full"
              />
            </label>
          </div>
          <div className="flex flex-col mb-4">
            <div className="label">
              <label
                htmlFor="password-confirm"
                className="font-hind text-xl font-semibold"
              >
                Nouveau mot de passe
              </label>
            </div>

            <label
              className="input input-bordered flex items-center gap-2"
              aria-label="new-password"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                value={newPassword}
                onChange={(e) => handlerNewPassword(e)}
                type="password"
                placeholder="Nouveau mot de passe"
                id="password-(e) => confirm"
                className=" w-full"
              />
            </label>
          </div>
          <div className="flex flex-col mb-4">
            <div className="label">
              <label
                htmlFor="password-confirm"
                className="font-hind text-xl font-semibold"
              >
                Confirmer le nouveau mot de passe
              </label>
            </div>

            <label
              className="input input-bordered flex items-center gap-2"
              aria-label="confirm-new-password"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                value={newPasswordConfirm}
                onChange={(e) => handlerNewPAsswordConfirm(e)}
                type="password"
                placeholder="Confirmer le nouveau mot de passe"
                id="password-(e) => confirm"
                className=" w-full"
              />
            </label>
          </div>
          <div className="flex flex-col">
            <button
              type="submit"
              className="btn btn-success text-base text-white mt-4 w-1/4 mx-auto"
            >
              Confirmer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ModalEditPassword;
