import axios from 'axios';
import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import { Activities } from '../../@types';

// Création de l'interface (ce à quoi devra ressembler l'état)
interface ActivitiesState {
  searchedActivities: Activities[];
  loader: boolean;
}

export const fetchActivitiesByCountryCity = createAsyncThunk(
  'ACTIVITIES/FETCH_BY_COUNTRY_CITY',
  async ({ city }: { city: string }) => {
    // API externe (temporaire)
    const options = {
      method: 'GET',
      url: `${import.meta.env.VITE_API_URL}/activity/search/${city}`,
    };
    const { data } = await axios.request(options);

    // if (data.length === 0) {

    // }
    // compléter avec les données de notre API
    return data.data as Activities[];
  }
);

// On initialise notre state de départ
const initialState: ActivitiesState = {
  searchedActivities: [],
  loader: false,
};

// On créé le reducer
export const activitiesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchActivitiesByCountryCity.fulfilled, (state, action) => {
      state.searchedActivities = action.payload;
      state.loader = false;
    })
    .addCase(fetchActivitiesByCountryCity.rejected, (state) => {
      state.searchedActivities = [];
      state.loader = false;
    })
    .addCase(fetchActivitiesByCountryCity.pending, (state) => {
      state.searchedActivities = [];
      state.loader = true;
      console.log('chargement dans le loader');
    });
  //
});
