'use client';

import React, { useContext } from 'react';
import { PokemonContext } from '@/context/PokemonContext';

interface PokemonProps {
  pokemon: {
    id: string;
    status: string;
    image: string;
    location: { lat: number; lng: number };
    name: string;
  };
  lat: number;
  lng: number;
  zoom: number;
}

function show(p: any, nw: any, se: any) {
  if (
    p.status !== 'caught' &&
    p.location.lat >= se.lat &&
    p.location.lat <= nw.lat &&
    p.location.lng <= se.lng &&
    p.location.lng >= nw.lng
  ) {
    return true;
  }
  return false;
}

function Pokemon({ pokemon, zoom }: PokemonProps) {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('Pokemon must be used within PokemonContextProvider');
  }

  const { setPokeball, bounds, setPokemonStatus } = context;
  const size = 50;
  const { status, id, image } = pokemon;
  const style = {
    width: size,
    height: size,
    backgroundImage: `url(${image})`,
  };

  const handleClick = () => {
    setPokeball(pokemon);
    setPokemonStatus(id, 'caught');
  };

  return (
    <>
      {status === 'pokeball' ? (
        <div className="pokeball">
          <img src="/pokeball.png" alt="Pokeball" />
        </div>
      ) : status !== 'caught' &&
        parseInt(zoom.toString()) >= 7 &&
        bounds &&
        show(pokemon, bounds.nw, bounds.se) ? (
        <div className="pokemon" style={style} onClick={handleClick}></div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Pokemon;