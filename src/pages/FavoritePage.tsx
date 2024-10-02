import { useAppSelector } from '../hooks/redux';
import Card from '../components/Card';

function FavoritePage() {
  const myFavorites = useAppSelector((store) => store.profile.myFavorites);

  const myFavoritesActivities = myFavorites.map((activity) => (
    <Card activity={activity} key={activity.id} />
  ));
  return (
    <div className="flex flex-wrap justify-center md:justify-normal overflow-scroll gap-5 p-5 h-full items-center ">
      {myFavoritesActivities.length > 0 ? (
        myFavoritesActivities
      ) : (
        <p className="m-auto text-xl">Aucune activité favorite</p>
      )}
    </div>
  );
}
export default FavoritePage;
