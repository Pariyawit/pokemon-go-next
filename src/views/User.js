import React, { useContext, useState, useEffect } from 'react';
import * as firebase from 'firebase';
import { PokemonContext } from '../context/PokemonContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

function User() {
  const [loading, setLoading] = useState(true);
  const { setUser, user, setPokemons, initState, pokemons } = useContext(
    PokemonContext
  );

  const catched = pokemons.reduce(
    (total, p) => (p.status == 'caught' ? total + 1 : total),
    0
  );

  const retrievePokemon = (userId) => {
    setLoading(true);
    firebase
      .database()
      .ref('/users/' + userId)
      .once('value')
      .then(function (snapshot) {
        setPokemons(snapshot.val().pokemons);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleSignOut = () => {
    firebase.auth().signOut();
    try {
      localStorage.removeItem('user');
    } catch (e) {
      console.log(e);
    }
    setUser(null);
    setLoading('logout');
    console.log('loggedOut');
  };

  useEffect(() => {
    if (loading == 'logout') {
      setTimeout(() => {
        setPokemons(initState);
        setLoading(false);
      }, 1500);
    }
  }, [loading]);

  const signInFacebook = () => {
    setLoading(true);
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        setUser(result.user);
        try {
          localStorage.setItem('user', JSON.stringify(result.user));
        } catch (e) {
          console.log(e);
        }
        retrievePokemon(result.user.uid);
      })
      .catch(function (error) {
        setLoading(false);
      });
  };

  const signInGoogle = () => {
    setLoading(true);
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        // ...
        setUser(result.user);
        try {
          localStorage.setItem('user', JSON.stringify(result.user));
        } catch (e) {
          console.log(e);
        }
        retrievePokemon(result.user.uid);
      })
      .catch(function (error) {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (pokemons.length == 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [pokemons]);

  return (
    <div className='container container--blue wrapper'>
      <div className='user'>
        {loading ? (
          <div className='loading'>
            <img src='/pokeball-spining.gif' />
          </div>
        ) : (
          <>
            {user ? (
              <div className='login profile'>
                <div>
                  <img className='profile__photo' src={user.photoURL} />
                </div>
                <h4 className='profile__name'>{user.displayName}</h4>
                <div className='submenu submenu--space-between'>
                  <div>Pokémon</div>
                  <div className='number'>{`${catched}/${pokemons.length}`}</div>
                </div>
                <button
                  className='btn btn--outline btn--sm'
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className='login'>
                <p>Log in to save your progress</p>
                <div className='login__icon'>
                  <div>
                    <button className='btn btn-icon' onClick={signInGoogle}>
                      <FontAwesomeIcon className='fa-icon' icon={faGoogle} />{' '}
                      Login with Google
                    </button>
                  </div>
                  <div>
                    <button className='btn btn-icon' onClick={signInFacebook}>
                      <FontAwesomeIcon className='fa-icon' icon={faFacebook} />{' '}
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
