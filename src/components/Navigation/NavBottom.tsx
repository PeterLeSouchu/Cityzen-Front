import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faCircleInfo, faHouse } from '@fortawesome/free-solid-svg-icons';
import ProfileBtn from './ProfileBtn';

function NavBottom() {
  return (
    <nav className="flex justify-around items-center bg-white md:hidden fixed bottom-0 left-0 right-0 h-10 z-40">
      <div className="dropdown dropdown-top">
        <ProfileBtn />
      </div>

      <Link to="/" aria-label="link-to-home">
        <FontAwesomeIcon icon={faHouse} className="h-8" />
      </Link>

      <Link to="/about" aria-label="link-to-aboutPage">
        <FontAwesomeIcon icon={faCircleInfo} className="h-8" />
      </Link>
    </nav>
  );
}
export default NavBottom;
