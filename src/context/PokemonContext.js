import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { centroidsData } from '../data/centroidsData';
import * as firebase from 'firebase';

const POKEMONS = gql`
  {
    pokemons(first: 151) {
      id
      number
      name
      image
      maxHP
    }
  }
`;

const PokemonContext = React.createContext();

function writePokemonData(userId, pokemons) {
  const database = firebase.database();
  firebase
    .database()
    .ref('users/' + userId)
    .set({
      pokemons: pokemons,
    });
}

var storage = null;
try {
  storage = window.sessionStorage || null;
} catch (e) {
  storage = null;
}

function PokemonContextProvider(props) {
  const [pokemons, setPokemons] = useState([]);
  const [user, setUser] = useState(null);
  const [pokeball, setPokeball] = useState();
  const [bounds, setBounds] = useState();
  const [center, setCenter] = useState({
    lat: 20,
    lng: 0,
  });
  const [zoom, setZoom] = useState(2);
  const { loading, error, data } = useQuery(POKEMONS);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;

  let locations = centroidsData;

  const setPokemonStatus = (id, status) => {
    const updatePokemons = pokemons.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          status: status,
        };
      }
      return p;
    });
    setPokemons(updatePokemons);
    try {
      storage.setItem('pokemon-go', JSON.stringify(updatePokemons));
    } catch (e) {
      console.log(e);
    }
    if (user) {
      writePokemonData(user.uid, updatePokemons);
    }
  };

  const location = () => {
    const index = Math.floor(Math.random() * locations.length);
    const l = {
      lat: locations[index].LAT,
      lng: locations[index].LONG,
    };
    locations.splice(index, 1);
    return l;
  };

  //init game
  useEffect(() => {
    console.log(user);
    if (user) {
      firebase
        .database()
        .ref('/users/' + user.uid)
        .once('value')
        .then(function (snapshot) {
          console.log(snapshot);
          console.log('success');
        })
        .catch((err) => console.log(err));
      // }
      // if (storage && storage.getItem('pokemon-go')) {
      //   try {
      //     setPokemons(JSON.parse(storage.getItem('pokemon-go')));
      //   } catch (e) {
      //     console.log(e);
      //   }
    } else {
      if (data) {
        console.log(data);
        const updatePokemons = data.pokemons.map((p) => ({
          ...p,
          status: 'wild',
          location: location(),
        }));
        setPokemons(updatePokemons);
        try {
          storage.setItem('pokemon-go', JSON.stringify(updatePokemons));
        } catch (e) {
          console.log(e);
        }
      }
    }
  }, []);

  const context = {
    pokemons,
    zoom,
    setZoom,
    center,
    setCenter,
    setPokemonStatus,
    pokeball,
    setPokeball,
    bounds,
    setBounds,
    user,
  };
  return (
    <PokemonContext.Provider value={context}>
      {props.children}
    </PokemonContext.Provider>
  );
}

export { PokemonContextProvider, PokemonContext };
