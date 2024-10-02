import useMediaQuery from '@mui/material/useMediaQuery';
import { Outlet } from 'react-router-dom';

import Header from '../components/Navigation/Hearder/Header';
import Footer from '../components/Footer';
import NavBottom from '../components/Navigation/NavBottom';
// Notification is placed here to make it available to all other components
import Notification from '../components/Notification';

function Root() {
  const isSmDown = useMediaQuery('(max-width: 767px)');
  return (
    <div>
      <Header />
      <section className=" mb-10 md:mb-0 min-h-90 ">
        <main className="min-h-80">
          <Outlet />
        </main>
        <Footer />
      </section>
      {isSmDown && <NavBottom />}
      <Notification />
    </div>
  );
}

export default Root;
