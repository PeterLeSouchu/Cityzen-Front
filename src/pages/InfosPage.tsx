import { useState } from 'react';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalPseudo from '../components/Modals/ModalAuthentification/ModalPseudo';
import { useAppSelector } from '../hooks/redux';
import ModalEditPassword from '../components/Modals/ModalAuthentification/ModalEditPassword';
import ModalDeleteAccount from '../components/Modals/ModalAuthentification/ModalDeleteAccount';

function InfosPage() {
  const credentials = useAppSelector((store) => store.profile.credentials);
  const [modalPseudo, setModalPseudo] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  function handlerPseudo(): void {
    setModalPseudo((modal) => !modal);
  }

  function handlerPassword(): void {
    setModalPassword((modal) => !modal);
  }

  function handlerDelete(): void {
    setModalDelete((modal) => !modal);
  }
  return (
    <>
      <div className="flex flex-col justify-between m-7 ">
        <label className="block text-gray-700 " htmlFor="pseudo">
          Pseudo
        </label>
        <div className="flex items-center space-x-2 font-montserrat mt-2">
          <input
            type="text"
            className="w-auto min-w-36 h-6 border rounded px-4 py-2  bg-lightgrey"
            id="pseudo"
            disabled
            placeholder={credentials.pseudo}
          />
          <button
            onClick={handlerPseudo}
            type="button"
            className="ml-1 border rounded-btn px-4 py-2 hover:bg-gray-300 h-6 flex items-center"
          >
            <FontAwesomeIcon icon={faPen} className=" md:mr-2 text-green" />
            <span className="hidden md:inline ml-2">Modifier</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col m-7 font-montserrat">
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          className="w-3/6 min-w-56 min h-6 border rounded px-4 py-2 mt-2 bg-lightgrey"
          id="email"
          disabled
          placeholder={credentials.email}
        />
      </div>

      <div className="m-7 w-2/6 min-w-64 flex flex-col">
        <button
          onClick={handlerPassword}
          type="button"
          className="border rounded-btn px-4 py-2 hover:bg-gray-300  flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faPen} className=" md:mr-2 text-green" />
          <span className=" md:inline ml-2">Modifier mon mot de passe</span>
        </button>
      </div>
      <div className="m-7 w-2/6 min-w-64 flex flex-col">
        <button
          onClick={handlerDelete}
          type="button"
          className="border rounded-btn px-4 py-2 hover:bg-gray-300 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faTrash} className=" md:mr-2 text-green" />
          <span className=" md:inline ml-2">Supprimer mon compte</span>
        </button>
      </div>
      {modalPseudo && <ModalPseudo setModalPseudo={setModalPseudo} />}
      {modalPassword && (
        <ModalEditPassword setModalPassword={setModalPassword} />
      )}
      {modalDelete && <ModalDeleteAccount setModalDelete={setModalDelete} />}
    </>
  );
}
export default InfosPage;
