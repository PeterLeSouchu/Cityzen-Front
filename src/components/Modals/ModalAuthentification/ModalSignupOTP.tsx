import axios from 'axios';
import { useState } from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import { getFavorites, login } from '../../../store/reducers/profileReducer';
import handlerBackError from '../../../utils/Errors/handlerBackError';
import handlerFrontError from '../../../utils/Errors/handlerFrontError';
import { AxiosError } from '../../../@types';
import Error from '../../Error';

interface ModalSignupOTPProps {
  setModalSignupOTP: React.Dispatch<React.SetStateAction<boolean>>;
  notify: () => void;
}

function ModalSignupOTP({ setModalSignupOTP, notify }: ModalSignupOTPProps) {
  const dispatch = useAppDispatch();
  const [code, setCode] = useState<string>('');

  async function handlerRegister(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup/confirmation`,
        { OTP: code },
        { withCredentials: true }
      );

      dispatch(login(data.data[0]));
      dispatch(getFavorites());
      setCode('');
      notify();
      setModalSignupOTP(false);
      handlerFrontError('', dispatch);
    } catch (oldError) {
      const error = oldError as AxiosError;
      handlerBackError(error, dispatch);
    }
  }

  function handlerCode(e: React.ChangeEvent<HTMLInputElement>): void {
    setCode(e.target.value);
  }

  return (
    <div className=" fixed z-50  w-screen flex justify-center items-center h-screen left-0 top-0">
      <div className="z-50 min-w-80 w-2/5 min-h-2/5 fixed  bg-lightgrey rounded-md p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-montserrat text-3xl font-semibold italic">
            Validez l&apos;inscription
          </span>
          <button
            onClick={() => {
              setModalSignupOTP(false);
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
        <form onSubmit={(e) => handlerRegister(e)} className="flex flex-col">
          <div className="flex flex-col mb-4">
            <Error />
            <div className="label">
              <label htmlFor="code" className="font-hind text-xl font-semibold">
                Entrez le code OTP que vous avez reçu par email
              </label>
            </div>
            <input
              value={code}
              onChange={(e) => handlerCode(e)}
              type="code"
              placeholder="Entrez le code OTP"
              id="code"
              className="input input-bordered w-full"
            />
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
export default ModalSignupOTP;
