import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { centroidsData } from '../data/centroidsData';

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

var storage = null;
try {
  storage = window.sessionStorage || null;
} catch (e) {
  storage = null;
}

function PokemonContextProvider(props) {
  const [pokemons, setPokemons] = useState([]);
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

  useEffect(() => {
    if (storage && storage.getItem('pokemon-go')) {
      try {
        setPokemons(JSON.parse(storage.getItem('pokemon-go')));
      } catch (e) {
        console.log(e);
      }
    } else {
      if (data) {
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
  }, [data]);

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
  };
  return (
    <PokemonContext.Provider value={context}>
      {props.children}
    </PokemonContext.Provider>
  );
}

export { PokemonContextProvider, PokemonContext };
