import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { Credentials, Activities } from '../../@types';

// Création de l'interface (ce à quoi devra ressembler l'état)
interface ActivitiesState {
  logged: boolean;
  credentials: Credentials;
  myFavorites: Activities[];
  error: string;
}

export const addToFavorites = createAsyncThunk(
  'PROFILE/ADD-TO-FAVORITES',
  async ({ id }: { id: number }) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/profil/favorite`,
      { id },
      {
        withCredentials: true,
      }
    );
    return data.data[0] as Activities;
  }
);
export const deleteFromFavorites = createAsyncThunk(
  'PROFILE/ADELETE-FROM-FAVORITES',
  async ({ id }: { id: number }) => {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_URL}/profil/favorite/${id}`,
      {
        withCredentials: true,
      }
    );
    return data.data[0].id as number;
  }
);

export const getFavorites = createAsyncThunk(
  'PROFILE/GET-FAVORITES',
  async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/profil/favorite`,
      {
        withCredentials: true,
      }
    );
    return data.data as Activities[];
  }
);

export const login = createAction<{ pseudo: string; email: string }>(
  'PROFILE/LOGIN'
);

export const logout = createAsyncThunk('PROFILE/LOGOUT', async () => {
  await axios.post(
    `${import.meta.env.VITE_API_URL}/signout`,
    {},
    {
      withCredentials: true,
    }
  );
  return true;
});

export const changePseudo = createAsyncThunk(
  'PROFILE/CHANGE_PSEUDO',
  async ({ newPseudo }: { newPseudo: string }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/csrf-token`,
      {
        withCredentials: true,
      }
    );
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_URL}/profil/pseudo`,
      { newPseudo },
      {
        headers: {
          'x-csrf-token': response.data.csrfToken,
        },
        withCredentials: true,
      }
    );
    return data.data[0];
  }
);

export const updateFavorites = createAction<number>('PROFILE/UPDATE_FAVORITES');

export const errorDisplay = createAction<string>('PROFILE/ERROR_DISPLAY');

// On initialise notre state de départ
const initialState: ActivitiesState = {
  logged: JSON.parse(localStorage.getItem('logged') || 'false'),
  credentials: {
    pseudo: localStorage.getItem('pseudo') || '',
    email: localStorage.getItem('email') || '',
  },
  myFavorites: JSON.parse(localStorage.getItem('myFavorites') || '[]'),
  error: '',
};

export const profileReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToFavorites.fulfilled, (state, action) => {
      state.myFavorites.push(action.payload);
      localStorage.setItem('myFavorites', JSON.stringify(state.myFavorites));
    })
    .addCase(deleteFromFavorites.fulfilled, (state, action) => {
      state.myFavorites = state.myFavorites.filter(
        (activity) => activity.id !== action.payload
      );
      localStorage.setItem('myFavorites', JSON.stringify(state.myFavorites));
    })
    .addCase(getFavorites.fulfilled, (state, action) => {
      state.myFavorites = action.payload;
      localStorage.setItem('myFavorites', JSON.stringify(action.payload));
    })
    .addCase(login, (state, action) => {
      state.logged = true;
      localStorage.setItem('logged', 'true');
      state.credentials.pseudo = action.payload.pseudo;
      state.credentials.email = action.payload.email;
      localStorage.setItem('pseudo', action.payload.pseudo);
      localStorage.setItem('email', action.payload.email);
    })
    .addCase(logout.fulfilled, (state) => {
      state.logged = false;
      localStorage.setItem('logged', JSON.stringify(state.logged));
      state.myFavorites = [];
      localStorage.setItem('myFavorites', JSON.stringify(state.myFavorites));
      state.credentials.email = '';
      localStorage.setItem('email', JSON.stringify(state.credentials.email));
      state.credentials.pseudo = '';
      localStorage.setItem('pseudo', JSON.stringify(state.credentials.pseudo));
    })
    .addCase(updateFavorites, (state, action) => {
      state.myFavorites = state.myFavorites.filter(
        (favorite) => favorite.id !== action.payload
      );
      localStorage.setItem('myFavorites', JSON.stringify(state.myFavorites));
    })
    .addCase(changePseudo.fulfilled, (state, action) => {
      state.credentials.pseudo = action.payload;
      localStorage.setItem('pseudo', state.credentials.pseudo);
    })
    .addCase(errorDisplay, (state, action) => {
      state.error = action.payload;
    });
});
