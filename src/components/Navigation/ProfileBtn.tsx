import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Slide, toast } from 'react-toastify';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/reducers/profileReducer';
import ModalSignup from '../Modals/ModalAuthentification/ModalSignup';
import ModalSignin from '../Modals/ModalAuthentification/ModalSignin';
import ModalSignupOTP from '../Modals/ModalAuthentification/ModalSignupOTP';

function ProfileBtn() {
  const pseudo = useAppSelector((store) => store.profile.credentials.pseudo);
  const logged = useAppSelector((store) => store.profile.logged);

  const [modalSignup, setModalSignup] = useState(false);
  const [modalSignin, setModalSignin] = useState(false);
  const [modalSignupOTP, setModalSignupOTP] = useState(false);

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
  const notifySignup = () => {
    toast.success('inscription reussie', {
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

  const notifyLogout = () => {
    toast.success('Déconnexion réussie', {
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

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handlerSignup(): void {
    console.log('inscriptionnn');
    setModalSignup((modal) => !modal);
    setModalSignin(false);
  }
  function handlerSignin(): void {
    setModalSignin((modal) => !modal);
    setModalSignup(false);
  }

  function handlerLogout(): void {
    dispatch(logout());
    navigate('/');
  }

  return (
    <>
      <div>
        <div
          tabIndex={0}
          role="button"
          className="btn  md:bg-white bg-black"
          aria-label="button-dropdown"
        >
          {logged ? (
            <span className="text-white md:text-black text-xl">
              {' '}
              {pseudo.charAt(0).toLocaleUpperCase()}
            </span>
          ) : (
            <FontAwesomeIcon
              icon={faUser}
              className="text-white md:text-black text-xl"
            />
          )}
        </div>
        <ul className="dropdown-content menu bg-base-100 rounded-box z-40 w-52 p-2 shadow">
          {logged ? (
            <>
              <li>
                <Link to="/profile" role="button" tabIndex={0}>
                  Mon profil
                </Link>
              </li>
              <li>
                <button
                  tabIndex={0}
                  type="button"
                  onClick={() => {
                    handlerLogout();
                    notifyLogout();
                  }}
                >
                  Se déconnecter
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button type="button" onMouseDown={() => handlerSignup()}>
                  Inscription
                </button>
              </li>
              <li>
                <button type="button" onMouseDown={() => handlerSignin()}>
                  Connexion
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
      {modalSignup && (
        <ModalSignup
          setModalSignup={setModalSignup}
          setModalSignupOTP={setModalSignupOTP}
        />
      )}
      {modalSignin && (
        <ModalSignin notify={notifySignin} setModalSignin={setModalSignin} />
      )}
      {modalSignupOTP && (
        <ModalSignupOTP
          notify={notifySignup}
          setModalSignupOTP={setModalSignupOTP}
        />
      )}
    </>
  );
}
export default ProfileBtn;
