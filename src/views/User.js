import React, { useContext } from 'react';
import * as firebase from 'firebase';
import { PokemonContext } from '../context/PokemonContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

function User() {
  const { setUser, user, setPokemons, initState } = useContext(PokemonContext);

  const retrievePokemon = (userId) => {
    console.log('hi');
    firebase
      .database()
      .ref('/users/' + userId)
      .once('value')
      .then(function (snapshot) {
        setPokemons(snapshot.val().pokemons);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignOut = () => {
    firebase.auth().signOut();
    localStorage.removeItem('user');
    setUser(null);
    setPokemons(initState);
  };

  const signInFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        console.log(result);
        setUser(result.user);
        localStorage.setItem('user', JSON.stringify(result.user));
        retrievePokemon(result.user.uid);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  const signInGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        // ...
        console.log(result);
        setUser(result.user);
        localStorage.setItem('user', JSON.stringify(result.user));
        retrievePokemon(result.user.uid);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };
  return (
    <div className='container container--blue wrapper'>
      <div className='user'>
        {user && <h1>Hi {user.displayName}</h1>}
        {user ? (
          <button className='btn' onClick={handleSignOut}>
            Sign Out
          </button>
        ) : (
          <div className='login'>
            <p>Log in to save your progress</p>
            <div className='login__icon'>
              <div>
                <button className='btn btn-icon' onClick={signInGoogle}>
                  <FontAwesomeIcon className='fa-icon' icon={faGoogle} /> Login
                  with Google
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
      </div>
    </div>
  );
}

export default User;
