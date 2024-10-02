import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import { Activities, LoaderActivities } from '../@types';
import Card from '../components/Card';
// import image from '../assets/ville1.jpg';

// eslint-disable-next-line react-refresh/only-export-components
export const loadActivities = async (): Promise<LoaderActivities> => {
  try {
    const [recentsResponse, topRatedResponse] = await Promise.all([
      axios.get<{ data: Activities[] }>(
        `${import.meta.env.VITE_API_URL}/activity/recent`
      ),
      axios.get<{ data: Activities[] }>(
        `${import.meta.env.VITE_API_URL}/activity/rating`
      ),
    ]);

    return {
      recents: recentsResponse.data.data,
      topRated: topRatedResponse.data.data,
    };
  } catch (error: unknown) {
    console.error('Error loading data:', error);
    throw new Error("Oops, les données n'ont pas pu être chargées");
  }
};

function HomePage() {
  const { recents, topRated } = useLoaderData() as LoaderActivities;

  const recentsActivities = recents.map((activity) => (
    <Card activity={activity} key={activity.id} />
  ));

  const ratingActivities = topRated.map((activity) => (
    <Card activity={activity} key={activity.id} />
  ));

  return (
    <div className="md:p-10 p-2">
      <div className="hero  bg-city  bg-cover bg-center    w-full rounded-md mb-5 h-80">
        <div className=" h-full w-full flex flex-col justify-center text-center gap-8 md:gap-12 lg:gap-16 font-montserrat z-10">
          <div className="md:w-1/2 m-auto rounded-xl w-3/4 ">
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white/90 font-bold ">
              CITYZEN
            </h1>
            <h2 className="text-3xl md:text-5xl lg:text-5xl text-white p-3 backdrop-blur-sm bg-green/10 rounded-2xl  ">
              Vivez le rythme de votre ville en <br />
              <span className="text-white italic">
                découvrant les activités locales
              </span>
            </h2>
          </div>
        </div>
      </div>

      <div className="bg-lightgrey flex flex-col justify-between  rounded">
        <div className="w-5/6 m-auto my-7">
          <div className="flex flex-col w-full">
            <h3 className="font-montserrat font-semibold mb-6 text-2xl md:mb-8 md:text-4xl pl-10">
              Acitivités les plus récentes
            </h3>
            <div className=" gap-5 flex flex-row overflow-x-auto p-10  ">
              {recentsActivities}
            </div>
          </div>
        </div>
        <div className="w-5/6 m-auto my-7">
          <div className="flex flex-col w-full">
            <h3 className="font-montserrat font-semibold mb-6 text-2xl md:mb-8 md:text-4xl pl-10">
              Activités les mieux notés
            </h3>
            <div className=" gap-5 flex flex-row overflow-x-auto p-10 ">
              {ratingActivities}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
