import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { City } from '../../../@types';
import { useAppDispatch } from '../../../hooks/redux';
import { fetchActivitiesByCountryCity } from '../../../store/reducers/activitiesReducer';

function SearchBar() {
  const location = useLocation();

  const [city, setCity] = useState<string>('');
  const [citySuggestions, setCitySuggestions] = useState<City[]>([]);
  const suggestionsRef = useRef<HTMLDivElement>(null);

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

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const fetchData = async () => {
      try {
        await dispatch(fetchActivitiesByCountryCity({ city }));

        if (location.pathname !== '/activities') {
          navigate('/activities');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }

  // Gestion des clics en dehors de la suggestion
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

  return (
    <form
      className="h-12 w-3/4 max-w-xl md:w-1/2 bg-lightgrey border-2 rounded-md items-center"
      onSubmit={(event) => handleFormSubmit(event)}
    >
      <div className="flex flex-row h-full">
        <div className="w-full relative">
          <input
            required
            onChange={handlerChangeCity}
            value={city}
            type="text"
            placeholder="Rechercher une ville"
            className="h-full  w-full  p-2 outline-none"
          />
          {citySuggestions.length > 0 && ( 
            <div
              ref={suggestionsRef}
              className="absolute top-full left-0 z-50 w-full bg-white border rounded-md shadow-lg max-h-36 overflow-scroll"
            >
              {citySuggestions.map((suggestion: City) => (
                <button
                  type="button"
                  key={suggestion.id}
                  className="w-full text-left p-2 hover:bg-gray-100"
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
          className="rounded-r-md p-2 hover:bg-black hover:text-white duration-200"
          aria-label="Valider la recherche"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="h-6" />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
