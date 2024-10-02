/* eslint-disable import/no-extraneous-dependencies */
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngTuple } from 'leaflet';

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import markerIcon from '../assets/marker.png';
import { useAppSelector } from '../hooks/redux';

const customIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [25, 38],
});

function Map() {
  const searched = useAppSelector(
    (store) => store.activities.searchedActivities
  );

  const [center, setCenter] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    if (searched.length > 0) {
      const firstGeocode: [number, number] = [
        searched[0].latitude,
        searched[0].longitude,
      ];
      setCenter(firstGeocode);
    }
  }, [searched]);

  function ChangeMapView({ localisation }: { localisation: [number, number] }) {
    const map = useMap();
    useEffect(() => {
      map.setView(localisation);
    }, [localisation, map]);
    return null;
  }

  const activities = searched.map((activity) => ({
    geocode: [activity.latitude, activity.longitude] as LatLngTuple,
    id: activity.id,
    slug: activity.slug,
    title: activity.title,
    // url: activity.url_image,
    description: activity.description,
    avg_rate: activity.avg_rating,
    image: activity.url_image,
    address: activity.address,
    phone: activity.phone,
    city_id: activity.city_id,
  }));

  return (
    <MapContainer
      className="w-full h-full"
      center={[48.8566, 2.3522]}
      zoom={13}
      scrollWheelZoom
    >
      <ChangeMapView localisation={center} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=4LWp1keVJZWckLljEDQy"
      />
      {activities.map((activity) => (
        <Marker key={activity.id} position={activity.geocode} icon={customIcon}>
          <Popup>
            <Link
              to={`/activity-detail/${activity.slug}`}
              className="hover:opacity-80 duration-200 p-2"
            >
              <div className="md:w-60 md:h-60 w-40 h-40 text-center ">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="object-cover md:h-48 md:w-48 h-32 w-32 m-auto"
                />
                <h2 className="text-black font-hind font-bold  text-sm md:text-base lg:text-lg">
                  {activity.title}
                </h2>
                <div className="badge bg-grey/50 gap-2 md:p-3 lg:p-4">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-yellow-300 md:h-4 lg:h-5"
                  />
                  <span className="font-hind font-semibold text-sm md:text-base lg:text-lg">
                    {activity.avg_rate}
                  </span>
                </div>
              </div>
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
