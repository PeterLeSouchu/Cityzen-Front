/* eslint-disable react/require-default-props */
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Activities, AxiosError, City } from '../../../@types';
import handlerBackError from '../../../utils/Errors/handlerBackError';
import handlerFrontError from '../../../utils/Errors/handlerFrontError';
import { useAppDispatch } from '../../../hooks/redux';
import Error from '../../Error';

interface ModalEditActivityProps {
  setModalType: React.Dispatch<
    React.SetStateAction<'edit' | 'delete' | 'add' | null>
  >;
  setActivityId?: React.Dispatch<React.SetStateAction<number | null>>;
  id?: number | null;
  setMyActivities: React.Dispatch<React.SetStateAction<Activities[]>>;
  type: string;
}

function ModalActivity({
  setModalType,
  setActivityId,
  id,
  setMyActivities,
  type,
}: ModalEditActivityProps) {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [citySuggestions, setCitySuggestions] = useState([]);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setCitySuggestions([]);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  async function handlerRegister(
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

      if (type === 'edit') {
        const formDataEdit = new FormData();
        if (title) {
          formDataEdit.append('title', title);
        }
        if (description) {
          formDataEdit.append('description', description);
        }
        if (image) {
          formDataEdit.append('image', image);
        }
        if (phone) {
          formDataEdit.append('phone', phone);
        }
        if (address) {
          formDataEdit.append('address', address);
        }
        if (city) {
          formDataEdit.append('city', city);
        }
        const { data } = await axios.patch(
          `${import.meta.env.VITE_API_URL}/profil/activity/${id}`,
          formDataEdit,
          {
            headers: {
              'x-csrf-token': response.data.csrfToken,
            },
            withCredentials: true,
          }
        );
        setMyActivities((prev) =>
          prev.map((activity) =>
            activity.id === data.data[0].id ? data.data[0] : activity
          )
        );
        setActivityId?.(null);
        setModalType(null);
        handlerFrontError('', dispatch);
      }
      if (type === 'add') {
        const formDataAdd = new FormData();
        if (title) {
          formDataAdd.append('title', title);
        } else {
          handlerFrontError('Le champ "Titre" ne peut pas être vide', dispatch);
          return;
        }
        if (description) {
          formDataAdd.append('description', description);
        } else {
          handlerFrontError(
            'Le champ "Description" ne peut pas être vide',
            dispatch
          );
          return;
        }
        if (image) {
          formDataAdd.append('image', image);
        } else {
          handlerFrontError('Vous devez insérer une image', dispatch);
          return;
        }
        if (phone) {
          formDataAdd.append('phone', phone);
        } else {
          handlerFrontError(
            'Le champ "Numéro de téléphone" ne peut pas être vide',
            dispatch
          );
          return;
        }
        if (address) {
          formDataAdd.append('address', address);
        } else {
          handlerFrontError(
            'Le champ "Adresse postale" ne peut pas être vide',
            dispatch
          );
          return;
        }
        if (city) {
          formDataAdd.append('city', city);
        } else {
          handlerFrontError('Le champ "Ville" ne peut pas être vide', dispatch);
          return;
        }
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/profil/activity`,
          formDataAdd,
          {
            headers: {
              'x-csrf-token': response.data.csrfToken,
            },
            withCredentials: true,
          }
        );

        setMyActivities((prevItems) => [...prevItems, data.data[0]]);
        setModalType(null);
        handlerFrontError('', dispatch);
      }
    } catch (oldError) {
      const error = oldError as AxiosError;
      handlerBackError(error, dispatch);
    }
  }

  function handlerDescription(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void {
    setDescription(event.target.value);
  }

  function handlerTitle(event: React.ChangeEvent<HTMLInputElement>): void {
    setTitle(event.target.value);
  }

  function handlerImage(event: React.ChangeEvent<HTMLInputElement>): void {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setImage(selectedFile);
    }
  }

  function handlerPhone(e: React.ChangeEvent<HTMLInputElement>): void {
    setPhone(e.target.value);
  }

  function handlerAddress(e: React.ChangeEvent<HTMLInputElement>): void {
    setAddress(e.target.value);
  }

  async function handlerChangeCity(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;
    setCity(inputValue);

    try {
      if (inputValue.trim() === '') {
        setCitySuggestions([]);
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/city/${inputValue}`
      );

      const suggestions = response.data.data;

      setCitySuggestions(suggestions);
    } catch (error) {
      console.error(error);
      setCitySuggestions([]);
    }
  }
  const changeCityInput = (searchTerm: string) => {
    setCity(searchTerm);

    setCitySuggestions([]);
  };

  return (
    <div className=" absolute  w-screen flex justify-center items-center h-screen left-0 top-0">
      <div className="z-50 w-2/5 min-w-80 min-h-2/5 max-h-32 overflow-scroll fixed  bg-lightgrey rounded-md p-4 border-2 border-slate-300 ">
        <div className="flex justify-between items-center mb-4">
          <span className="font-montserrat text-3xl font-semibold italic">
            {type === 'add' ? "Ajout d'activité" : "Modification d'activité"}
          </span>
          <button
            onClick={() => {
              setModalType(null);
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
          <div className="flex flex-col my-1">
            <label className="label" htmlFor="title">
              Titre
            </label>
            <input
              onChange={(e) => handlerTitle(e)}
              defaultValue={title}
              type="text"
              placeholder="Entrez le titre de votre activité"
              id="title"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col my-1">
            <label htmlFor="file">Photo (1 seule) 5mo max</label>
            <input
              onChange={(e) => handlerImage(e)}
              type="file"
              placeholder="Ajouter une photo"
              id="file"
            />
          </div>
          <div className="flex flex-col my-1">
            <label htmlFor="description">Description</label>
            <textarea
              onChange={(e) => handlerDescription(e)}
              defaultValue={description}
              placeholder="Entrez la description de votre activité"
              id="description"
              className="input input-bordered w-full h-32"
            />
          </div>
          <div className="flex flex-col my-1">
            <label htmlFor="phone">Numéro de téléphone</label>
            <input
              onChange={(e) => handlerPhone(e)}
              defaultValue={phone}
              type="text"
              placeholder="Entrez votre numéro de téléphone"
              id="phone"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col my-1">
            <label htmlFor="adress">Adresse postale</label>
            <input
              onChange={(e) => handlerAddress(e)}
              defaultValue={address}
              type="text"
              placeholder="Entrez votre adresse postable"
              id="adress"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col my-1">
            <label htmlFor="city">Ville</label>
            <input
              onChange={handlerChangeCity}
              value={city}
              type="text"
              placeholder="Entrez votre ville"
              id="city"
              className="input input-bordered w-full"
            />
            {citySuggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="relative flex flex-col z-20 h-36 overflow-scroll"
              >
                {citySuggestions.map((suggestion: City) => (
                  <button
                    type="button"
                    key={suggestion.id}
                    className="w-full bg-white text-left p-2 hover:bg-gray-100"
                    onClick={() => changeCityInput(suggestion.name)}
                  >
                    {suggestion.name} {suggestion.department_code}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-success md:text-base text-sm text-white mt-4 w-1/4 mx-auto "
          >
            Confirmer
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalActivity;
