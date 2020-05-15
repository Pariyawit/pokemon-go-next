import React, { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';

function show(p, nw, se) {
  if (
    p.status != 'caught' &&
    p.location.lat >= se.lat &&
    p.location.lat <= nw.lat &&
    p.location.lng <= se.lng &&
    p.location.lng >= nw.lng
  ) {
    return true;
  }
  return false;
}

function Pokemon({ pokemon, zoom }) {
  const { setPokeball, bounds, setPokemonStatus } = useContext(PokemonContext);
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
        <div className='pokeball'>
          <img src='/pokeball.png'></img>
        </div>
      ) : status !== 'caught' &&
        parseInt(zoom) >= 7 &&
        show(pokemon, bounds.nw, bounds.se) ? (
        <div className='pokemon' style={style} onClick={handleClick}></div>
      ) : (
        // <div className='marker'></div>
        <div></div>
      )}
    </>
  );
}

export default Pokemon;
