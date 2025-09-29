'use client';

import React, { useContext } from 'react';
import { PokemonContext } from '@/context/PokemonContext';
import PokedexItem from '@/components/PokedexItem';

function Pokedex() {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('Pokedex must be used within PokemonContextProvider');
  }

  const { pokemons } = context;
  const list = pokemons.map((pokemon) => (
    <PokedexItem key={pokemon.id} pokemon={pokemon} />
  ));

  const catched = pokemons.reduce(
    (total, p) => (p.status === 'caught' ? total + 1 : total),
    0
  );

  return (
    <div className="container container--red">
      <div className="submenu submenu--space-between">
        <div>Pokédex</div>
        <div className="number">{`${catched}/${pokemons.length}`}</div>
      </div>
      <div className="pokedex grid">{list}</div>
    </div>
  );
}

export default Pokedex;