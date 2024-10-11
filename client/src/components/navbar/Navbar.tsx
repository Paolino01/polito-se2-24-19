import './navbar.css';
import logo from '../../assets/Group 19 logo.png';
import { Link } from 'react-router-dom';

function NavB() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <Link to="/" className="flex items-center">
          <img src={logo} className="h-8 pr-2" alt="Group 19 Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Group 19
          </span>
        </Link>
      </div>
    </nav>
  );
}

export { NavB };
