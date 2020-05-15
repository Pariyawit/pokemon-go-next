import React, { useContext } from 'react';
import * as firebase from 'firebase';
import { PokemonContext } from '../context/PokemonContext';

function User() {
  const { setUser, user, setPokemons } = useContext(PokemonContext);
  const database = firebase.database();

  const retrievePokemon = (userId) => {
    console.log('hi');
    firebase
      .database()
      .ref('/users/' + userId)
      .once('value')
      .then(function (snapshot) {
        setPokemons(snapshot.val().pokemons);
      })
      .catch((err) => console.log(err));
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
    <div>
      {user && <h1>Hi {user.displayName}</h1>}
      <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
      <button onClick={signInGoogle}>Sign In with Google Account</button>
      <button onClick={signInFacebook}>Sign In with Facebook Account</button>
    </div>
  );
}

export default User;
