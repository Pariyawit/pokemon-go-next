'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkedAlt,
  faTh,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { PokemonContext } from '@/context/PokemonContext';

function Header() {
  const pathname = usePathname();
  const { user } = useContext(PokemonContext);

  return (
    <header className='header'>
      <Link href='/'>
        <div>PokémonGo</div>
      </Link>
      <nav className='nav'>
        <ul className='nav__list'>
          <li className='nav__item'>
            <Link href='/'>
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
            <Link href='/pokedex'>
              <span
                className={`pokedex-icon ${
                  pathname.includes('/pokedex') && 'pokedex-icon--active'
                } `}
              >
                <FontAwesomeIcon icon={faTh} />
              </span>
            </Link>
          </li>
          {/* <li className="nav__item">
            <Link href="/user">
              {user ? (
                <span>
                  <img
                    className={`profile_icon ${
                      pathname.includes('/user') && 'profile_icon--active'
                    } `}
                    src={user.photoURL}
                    alt="Profile"
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
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
