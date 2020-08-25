import React, { useState, useEffect } from 'react';
// import { useQuery } from '@apollo/react-hooks';
// import { gql } from 'apollo-boost';
import { centroidsData } from '../data/centroidsData';
import * as firebase from 'firebase';
import { pokemonsData } from '../data/pokemonsData.js';

// const POKEMONS = gql`
//   {
//     pokemons(first: 151) {
//       id
//       number
//       name
//       image
//       maxHP
//     }
//   }
// `;

const PokemonContext = React.createContext();

function writePokemonData(userId, pokemons) {
  firebase
    .database()
    .ref('users/' + userId)
    .set({
      pokemons: pokemons,
    });
}

function PokemonContextProvider(props) {
  const [pokemons, setPokemons] = useState([]);
  const [initState, setInitState] = useState([]);
  const [user, setUser] = useState(null);
  const [pokeball, setPokeball] = useState();
  const [bounds, setBounds] = useState();
  const [center, setCenter] = useState({
    lat: 20,
    lng: 0,
  });
  const [zoom, setZoom] = useState(2);
  // const { loading, error, data } = useQuery(POKEMONS);
  const loading = false;
  const error = false;
  const data = { pokemons: pokemonsData };
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;

  let locations = centroidsData;

  useEffect(() => {
    try {
      if (localStorage.getItem('user')) {
        setUser(JSON.parse(localStorage.getItem('user')));
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

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
    if (data) {
      const updatePokemons = data.pokemons.map((p) => ({
        ...p,
        status: 'wild',
        location: location(),
      }));
      setInitState(updatePokemons);
      if (user) {
        firebase
          .database()
          .ref('/users/' + user.uid)
          .once('value')
          .then(function (snapshot) {
            setPokemons(snapshot.val().pokemons);
          })
          .catch((err) => console.log(err));
      } else {
        setPokemons(updatePokemons);
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
    setUser,
    setPokemons,
    initState,
  };
  return (
    <PokemonContext.Provider value={context}>
      {props.children}
    </PokemonContext.Provider>
  );
}

export { PokemonContextProvider, PokemonContext };
