import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkedAlt,
  faTh,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { PokemonContext } from '../context/PokemonContext';

function Header() {
  const { pathname } = useLocation();
  const { user } = useContext(PokemonContext);

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
          <li className='nav__item'>
            <Link to='/user'>
              {user ? (
                <span>
                  <img
                    className={`profile ${
                      pathname.includes('/user') && 'profile--active'
                    } `}
                    src={user.photoURL}
                  />
                </span>
              ) : (
                <span
                  className={`user-icon ${
                    pathname.includes('/user') && 'user-icon--active'
                  } `}
                >
                  <FontAwesomeIcon icon={faUserCircle} />
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
