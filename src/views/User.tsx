'use client';

import React, { useContext, useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signOut } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { auth, database } from '@/lib/firebase';
import { PokemonContext } from '@/context/PokemonContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

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
    const userRef = ref(database, '/users/' + userId);
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setPokemons(snapshot.val().pokemons);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleSignOut = () => {
    signOut(auth);
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

  const signInFacebook = () => {
    setLoading(true);
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser({
          uid: user.uid,
          photoURL: user.photoURL || '',
          displayName: user.displayName || '',
        });
        try {
          if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify({
              uid: user.uid,
              photoURL: user.photoURL,
              displayName: user.displayName,
            }));
          }
        } catch (e) {
          console.log(e);
        }
        retrievePokemon(user.uid);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const signInGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser({
          uid: user.uid,
          photoURL: user.photoURL || '',
          displayName: user.displayName || '',
        });
        try {
          if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify({
              uid: user.uid,
              photoURL: user.photoURL,
              displayName: user.displayName,
            }));
          }
        } catch (e) {
          console.log(e);
        }
        retrievePokemon(user.uid);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
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
                <p>Log in to save your progress</p>
                <div className="login__icon">
                  <div>
                    <button className="btn btn-icon" onClick={signInGoogle}>
                      <FontAwesomeIcon className="fa-icon" icon={faGoogle} />{' '}
                      Login with Google
                    </button>
                  </div>
                  <div>
                    <button className="btn btn-icon" onClick={signInFacebook}>
                      <FontAwesomeIcon className="fa-icon" icon={faFacebook} />{' '}
                      Login with Facebook
                    </button>
                  </div>
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