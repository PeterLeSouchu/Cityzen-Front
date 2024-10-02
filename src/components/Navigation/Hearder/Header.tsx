import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/CITYZEN.png';
import ProfileBtn from '../ProfileBtn';
import SearchBar from './SearchBar';

function Header() {
  return (
    <header className=" relative flex items-center w-screen h-10 px-5 bg-green shadow-xl">
      <nav className="flex justify-between items-center w-screen">
        <Link to="/">
          <img className="h-14 rounded-full" src={logo} alt="logo-site" />
        </Link>
        <SearchBar />
        <div className="justify-between items-center hidden md:flex">
          <Link to="/about" className="w-16" aria-label="About-page">
            <FontAwesomeIcon
              icon={faCircleInfo}
              className="h-8 text-white/90"
            />
          </Link>
          <div>
            <div className="dropdown dropdown-bottom dropdown-end">
              <ProfileBtn />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Header;
