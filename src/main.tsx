import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import ProtectedRoute from './utils/ProtectedRoute';
import Root from './pages/Roots';
import AboutPage from './pages/AboutPage';
import ActivityPage, { loadActivity } from './pages/ActivityPage';
import HomePage, { loadActivities } from './pages/HomePage';
import ActivitiesPage from './pages/ResultsPage';
import ProfilePage from './pages/ProfilePage';
import InfosPage from './pages/InfosPage';
import FavoritePage from './pages/FavoritePage';
import NotFound from './pages/NotFoundPage';
import MyActivitiesPage from './pages/MyActivitiesPage';
import LegalNotices from './pages/LegalNoticesPage';
import './styles/index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<NotFound />}>
      <Route index element={<HomePage />} loader={loadActivities} />
      <Route
        path="/activity-detail/:slug"
        element={<ActivityPage />}
        loader={loadActivity}
      />
      <Route path="/activities" element={<ActivitiesPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<ProfilePage />}>
          <Route index element={<InfosPage />} />
          <Route path="/profile/favorites" element={<FavoritePage />} />
          <Route path="/profile/my-activities" element={<MyActivitiesPage />} />
        </Route>
      </Route>
      <Route path="/about" element={<AboutPage />} />
      <Route path="/legal-notices" element={<LegalNotices />} />
    </Route>
  )
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
