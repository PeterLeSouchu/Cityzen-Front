import { Octokit } from '@octokit/rest';
import { useEffect, useState } from 'react';
import image from '../assets/_3870d001-f54f-4f8d-8502-55c017efa105.jpeg';
import imageabout from '../assets/about.jpeg';

interface Member {
  id: number | undefined;
  login: string | undefined;
  avatar_url: string | undefined;
  html_url: string | undefined;
}

function AboutPage() {
  const [membersData, setMembersData] = useState<Member[] | []>([]);

  useEffect(() => {
    const octokit = new Octokit();
    async function fetchUserData(username: string) {
      try {
        const response = await octokit.request('GET /users/{username}', {
          username,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
          },
        });

        return response.data;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    const pseudos = {
      ryad: 'RyadC',
      emmanuel: 'CHARLESEmmanuel-25',
      peter: 'PeterLeSouchu',
      wilson: 'SemedoWilson',
      ziad: 'ziadelidrissi',
    };
    async function fetchAllUserData() {
      const promises = Object.values(pseudos).map((username) =>
        fetchUserData(username)
      );
      const results = await Promise.all(promises);
      const resultsFilter = results.map((result) => ({
        id: result?.id,
        login: result?.login,
        html_url: result?.html_url,
        avatar_url: result?.avatar_url,
      }));

      setMembersData(resultsFilter);
    }

    fetchAllUserData();
  }, []);

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="bg-lightgrey p-6  shadow-lg  w-1024 h-332 flex flex-col md:flex-row">
          <div className="md:w-2/5 md:pr-4 mx-auto xl:p-6 items-center ">
            <h2 className="text-2xl font-montserrat mt-8 mb-4 text-black">
              À propos de nous
            </h2>
            <p className="font-montserrat text-black mb-4">
              Nous sommes une équipe de cinq développeurs diplômés de
              l&apos;école O&apos;clock, spécialisée en développement web.
              Passionnés et déterminés, nous avons créé CityZen pour simplifier
              la découverte des activités locales.
            </p>
            <p className="font-montserrat text-black">
              Ensemble, nous mettons nos compétences au service d&apos;une
              plateforme intuitive et enrichissante pour les résidents et les
              visiteurs de chaque ville.
            </p>
          </div>
          <div className="md:w-1/2 mb-6 sm:pt-8 md:pt-8 md:mb-0 md:pr-4 justify-center items-center">
            <img
              src={imageabout}
              alt="cityview"
              className="rounded-lg shadow-lg w-3/4 mx-auto mt-6 mb-8"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row bg-white p-6  shadow-lg ">
          <div className="md:w-1/2 mb-6 md:mb-0 md:pt-8 md:pr-4 ">
            <img
              src={image}
              alt="cityview"
              className="flex rounded-lg shadow-lg w-3/4 mx-auto mt-8 mb-8"
            />
          </div>
          <div className="md:w-2/5 md:pl-4 mt-12 mx-auto xl:p-6 ">
            <h2 className="text-2xl font-montserrat mb-4  text-black">
              Qu&apos;est-ce que CityZen?
            </h2>
            <p className="mb-4 font-montserrat  text-black">
              CityZen est une plateforme web et mobile qui centralise toutes les
              activités disponibles dans une ville, comme les restaurants, les
              parcs, et les salles de sport.
            </p>
            <p className="font-montserrat  text-black">
              En entrant le nom de votre ville, vous découvrez une liste
              d&apos;activités avec des horaires, avis, photos et coordonnées,
              visibles aussi sur une carte interactive.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 ">
        <div className="bg-lightgrey p-6 shadow-lg">
          <h2 className="text-4xl font-montserrat mb-10 mt-10 text-center  text-black">
            Notre équipe
          </h2>

          <div className="flex flex-col justify-around sm:flex-row mb-20">
            {membersData.map((member: Member) => {
              return (
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={member.html_url}
                  key={member.id}
                  className="text-center font-montserrat text-black cursor-pointer mt-8"
                  title="Voir le github"
                >
                  <img
                    src={member.avatar_url}
                    alt={member.login}
                    className="rounded-full w-20 h-20 mb-2 mx-auto"
                  />
                  <p className="text-md font-hind font-semibold text-green  ">
                    {member.login}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
