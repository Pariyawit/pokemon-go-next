import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt, faTh } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

function Header() {
  const { pathname } = useLocation();
  return (
    <header className='header'>
      <Link to='/'>
        <div>PokémonGo</div>
      </Link>
      <nav className='nav'>
        <ul className='nav__list'>
          <li className='nav__item'>
            <Link to='/'>
              <span
                className={`map-icon ${
                  pathname === '/' && 'map-icon--active'
                } `}
              >
                <FontAwesomeIcon icon={faMapMarkedAlt} />
              </span>
            </Link>
          </li>
          <li className='nav__item'>
            <Link to='/pokedex'>
              <span
                className={`pokedex-icon ${
                  pathname.includes('/pokedex') && 'pokedex-icon--active'
                } `}
              >
                <FontAwesomeIcon icon={faTh} />
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
