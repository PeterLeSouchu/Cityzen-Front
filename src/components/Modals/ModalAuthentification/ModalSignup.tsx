import axios from 'axios';
import { useState } from 'react';
import handlerBackError from '../../../utils/Errors/handlerBackError';
import handlerFrontError from '../../../utils/Errors/handlerFrontError';
import { useAppDispatch } from '../../../hooks/redux';
import Error from '../../Error';
import { AxiosError } from '../../../@types';

interface ModalSignupProps {
  setModalSignup: React.Dispatch<React.SetStateAction<boolean>>;
  setModalSignupOTP: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalSignup({ setModalSignup, setModalSignupOTP }: ModalSignupProps) {
  const [pseudo, setPseudo] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const dispatch = useAppDispatch();

  async function handlerRegister(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    try {
      if (password !== passwordConfirm) {
        handlerFrontError('Les mots de passe ne correspondent pas', dispatch);
        return;
      }

      const userData = {
        pseudo,
        email,
        password,
        passwordConfirm,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        userData,
        {
          withCredentials: true,
        }
      );
      console.log(res.data.session.OTP);

      setPseudo('');
      setEmail('');
      setPassword('');
      setPasswordConfirm('');
      setModalSignup(false);
      handlerFrontError('', dispatch);
      setModalSignupOTP(true);
    } catch (oldError) {
      const error = oldError as AxiosError;

      handlerBackError(error, dispatch);
    }
  }

  function handlerPseudo(e: React.ChangeEvent<HTMLInputElement>): void {
    setPseudo(e.target.value);
  }

  function handlerEmail(e: React.ChangeEvent<HTMLInputElement>): void {
    setEmail(e.target.value);
  }

  function handlerPassword(e: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }
  function handlerConfirmPassword(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    setPasswordConfirm(e.target.value);
  }

  return (
    <div className="fixed z-50 w-screen flex justify-center items-center h-screen left-0 top-0">
      <div className="z-50 w-2/5 min-w-80 min-h-2/5 fixed max-h-32 overflow-scroll  bg-lightgrey rounded-md p-4 border-2 border-slate-300">
        <div className="flex justify-between items-center mb-4">
          <span className="font-montserrat text-3xl font-semibold italic">
            Inscription
          </span>
          <button
            onClick={() => {
              setModalSignup(false);
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
        <form onSubmit={(e) => handlerRegister(e)} className="flex flex-col">
          <div className="flex flex-col mb-4">
            <div className="label">
              <label
                htmlFor="pseudo"
                className="font-hind text-xl font-semibold"
              >
                Pseudo
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
                value={pseudo}
                onChange={(e) => handlerPseudo(e)}
                type="text"
                placeholder="Entrez votre pseudo"
                className=" w-full"
              />
            </label>
          </div>
          <div className="flex flex-col mb-4">
            <div className="label">
              <label
                htmlFor="email"
                className="font-hind text-xl font-semibold"
              >
                Email
              </label>
            </div>

            <label
              className="input input-bordered flex items-center gap-2"
              aria-label="email"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                value={email}
                onChange={(e) => handlerEmail(e)}
                type="text"
                placeholder="Entrez votre adresse email"
                className=" w-full"
              />
            </label>
          </div>
          <div className="flex flex-col mb-4">
            <div className="label">
              <label
                htmlFor="password"
                className="font-hind text-xl font-semibold"
              >
                Mot de passe
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
                value={password}
                onChange={(e) => handlerPassword(e)}
                type="password"
                placeholder="Entrez votre mot de passe"
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
                Confirmation du mot de passe
              </label>
            </div>

            <label
              className="input input-bordered flex items-center gap-2"
              aria-label="password-confirm"
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
                value={passwordConfirm}
                onChange={(e) => handlerConfirmPassword(e)}
                type="password"
                placeholder="Confirmez votre mot de passe"
                className=" w-full"
              />
            </label>
          </div>
          <button
            type="submit"
            className="btn md:text-base text-sm btn-success text-white mt-4 w-1/4 mx-auto"
          >
            Confirmer
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalSignup;
