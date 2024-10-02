import { configureStore } from '@reduxjs/toolkit';
import { activitiesReducer } from './reducers/activitiesReducer';
import { profileReducer } from './reducers/profileReducer';

// Création du store
const store = configureStore({
  reducer: {
    activities: activitiesReducer,
    profile: profileReducer,
  },
});

export default store;

// Ici on va typer les méthodes du store pour une meilleure clarté, et une meilleure efficacité du code ". On va ensuite exporter ces types vers "hooks/redux.ts".
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
