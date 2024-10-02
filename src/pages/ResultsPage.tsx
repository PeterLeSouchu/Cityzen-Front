import Map from '../components/Map';
import { useAppSelector } from '../hooks/redux';

import Card from '../components/Card';

function ActivitiesPage() {
  const searched = useAppSelector((store) => {
    return store.activities.searchedActivities;
  });
  const loader = useAppSelector((store) => store.activities.loader);
  console.log('Dans le composant : ');
  console.log(loader);

  const searchedActivities = searched.map((activity) => (
    <Card activity={activity} key={activity.id} />
  ));
  return (
    <div className="flex flex-col md:flex-row h-83">
      <div className=" bg-lightgrey md:w-7/12  w-full py-4 h-50 md:h-83 flex justify-center overflow-scroll">
        <div className="w-11/12 text-xl flex flex-wrap gap-5 py-4 overflow-scroll justify-center items-center">
          {loader && <span className="loading loading-spinner loading-lg" />}
          {searchedActivities.length > 0
            ? searchedActivities
            : 'Aucune activitée trouvée dans cette ville'}
        </div>
      </div>
      <div className="right-0 md:h-83 md:w-5/12 w-full h-50 z-0">
        <Map />
      </div>
    </div>
  );
}

export default ActivitiesPage;
