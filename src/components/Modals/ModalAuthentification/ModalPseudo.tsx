import { useState } from 'react';
import { Slide, toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import { changePseudo } from '../../../store/reducers/profileReducer';
import Error from '../../Error';
import handlerFrontError from '../../../utils/Errors/handlerFrontError';

interface ModalPseudoProps {
  setModalPseudo: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalPseudo({ setModalPseudo }: ModalPseudoProps) {
  const pseudo = useAppSelector((store) => store.profile.credentials.pseudo);

  const [newPseudo, setNewPseudo] = useState(pseudo);

  const dispatch = useAppDispatch();

  const notifyEditPseudo = () => {
    toast.success('Pseudo modifié', {
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

  async function handlerRegister(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    await dispatch(changePseudo({ newPseudo }));
    notifyEditPseudo();
    setModalPseudo(false);
    handlerFrontError('', dispatch);
  }

  function handlerPseudo(event: React.ChangeEvent<HTMLInputElement>): void {
    setNewPseudo(event.target.value);
  }

  return (
    <div className=" absolute  w-screen flex justify-center items-center h-screen left-0 top-0">
      <div className="z-50 w-2/5 min-w-80 min-h-2/5 fixed  bg-lightgrey rounded-md p-4 border-2 border-slate-300">
        <div className="flex justify-between items-center mb-4">
          <span className="font-montserrat text-3xl font-semibold italic">
            Modification du pseudo
          </span>
          <button
            onClick={() => {
              setModalPseudo(false);
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
        <form className="flex flex-col" onSubmit={(e) => handlerRegister(e)}>
          <div className="flex flex-col mb-4">
            <div className="label">
              <label
                htmlFor="pseudo"
                className="font-hind text-xl font-semibold"
              >
                Entrez votre nouveau pseudo
              </label>
            </div>

            <label
              className="input input-bordered flex items-center gap-2"
              aria-label="pseudo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                placeholder="Entrez votre nouveau pseudo"
                className=" w-full"
                defaultValue={newPseudo}
                onChange={handlerPseudo}
              />
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-success md:text-base text-sm text-white mt-4 w-1/4 mx-auto"
          >
            Confirmer
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalPseudo;
