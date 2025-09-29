'use client';

import React, { useContext, useState, useEffect } from 'react';
import { PokemonContext } from '@/context/PokemonContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function User() {
  const [loading, setLoading] = useState<boolean | string>(true);

  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('User must be used within PokemonContextProvider');
  }

  const { setUser, user, setPokemons, initState, pokemons } = context;

  const catched = pokemons.reduce(
    (total, p) => (p.status === 'caught' ? total + 1 : total),
    0
  );

  const retrievePokemon = (userId: string) => {
    setLoading(true);
    try {
      const savedPokemons = localStorage.getItem(`user_${userId}_pokemons`);
      if (savedPokemons) {
        setPokemons(JSON.parse(savedPokemons));
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleSignOut = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
    } catch (e) {
      console.log(e);
    }
    setUser(null);
    setLoading('logout');
    console.log('loggedOut');
  };

  useEffect(() => {
    if (loading === 'logout') {
      setTimeout(() => {
        setPokemons(initState);
        setLoading(false);
      }, 1500);
    }
  }, [loading, initState, setPokemons]);

  const [username, setUsername] = useState('');

  const handleLocalSignIn = () => {
    if (!username.trim()) return;

    setLoading(true);
    const userId = `local_${username.trim()}`;
    const newUser = {
      uid: userId,
      photoURL: '/default-avatar.png',
      displayName: username.trim(),
    };

    setUser(newUser);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(newUser));
      }
    } catch (e) {
      console.log(e);
    }
    retrievePokemon(userId);
  };

  useEffect(() => {
    if (pokemons.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [pokemons]);

  return (
    <div className="container container--blue wrapper">
      <div className="user">
        {loading ? (
          <div className="loading">
            <img src="/pokeball-spining.gif" alt="Loading" />
          </div>
        ) : (
          <>
            {user ? (
              <div className="login profile">
                <div>
                  <img className="profile__photo" src={user.photoURL} alt="Profile" />
                </div>
                <h4 className="profile__name">{user.displayName}</h4>
                <div className="submenu submenu--space-between">
                  <div>Pokémon</div>
                  <div className="number">{`${catched}/${pokemons.length}`}</div>
                </div>
                <button
                  className="btn btn--outline btn--sm"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="login">
                <p>Enter your name to save your progress</p>
                <div className="login__form">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLocalSignIn()}
                    className="form-input"
                  />
                  <button
                    className="btn btn-icon"
                    onClick={handleLocalSignIn}
                    disabled={!username.trim()}
                  >
                    <FontAwesomeIcon className="fa-icon" icon={faUser} />{' '}
                    Start Playing
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default User;