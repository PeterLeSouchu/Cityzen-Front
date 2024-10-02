import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="sticky footer footer-center bg-black text-white p-4 min-h-10 md:h-10 z-40 ">
      <aside className="flex justify-center items-center md:flex-row flex-col w-2/3">
        <p>
          Copyright © {new Date().getFullYear()} - CityZen - Tous droits
          réservés
        </p>
        <Link to="/legal-notices" className="underline">
          Mentions légales
        </Link>
      </aside>
    </footer>
  );
}

export default Footer;
