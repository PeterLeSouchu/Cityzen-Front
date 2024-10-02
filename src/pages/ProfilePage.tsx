import { Link, Outlet } from 'react-router-dom';
import { faUser, faHeart, faListUl } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ProfilePage() {
  return (
    <div className="h-80 max-w-6xl mx-auto flex flex-col md:flex-row  md:py-10 p-4  ">
      <div className=" md:w-1/4 bg-whiteP p-2 rounded-lg border-2 border-green/40 w-full   ">
        <ul className="flex md:flex-col justify-around items-center mx-auto flex-row w-full  h-full">
          <Link
            to="/profile"
            className="flex justify-center md:justify-normal items-center text-base lg:text-xl p-2 rounded transition duration-300 ease-in-out hover:bg-gray-300 w-full"
          >
            <FontAwesomeIcon
              icon={faUser}
              className="border rounded-btn p-2 text-3xl md:text-base"
            />
            <span className="hidden md:inline ml-2">Mes informations</span>
          </Link>

          <Link
            to="/profile/favorites"
            className=" flex items-center justify-center md:justify-normal text-base lg:text-xl p-2 rounded transition duration-300 ease-in-out hover:bg-gray-300 w-full"
          >
            <FontAwesomeIcon
              icon={faHeart}
              className="border rounded-btn p-2 text-3xl md:text-base"
            />{' '}
            <span className="hidden md:inline ml-2">Mes favoris</span>
          </Link>

          <Link
            to="/profile/my-activities"
            className="flex items-center justify-center md:justify-normal text-base lg:text-xl p-2 rounded transition duration-300 ease-in-out hover:bg-gray-300 w-full"
          >
            <FontAwesomeIcon
              icon={faListUl}
              className="border rounded-btn p-2 text-3xl md:text-base"
            />{' '}
            <span className="hidden md:inline ml-2">Mes activités</span>
          </Link>
        </ul>
      </div>
      <div className="md:w-3/4  w-full pr-2 mt-4 md:ml-4 md:mt-0 overflow-scroll h-full rounded-lg shadow-2xl border ">
        <section>
          <Outlet />
        </section>
      </div>
    </div>
  );
}

export default ProfilePage;
