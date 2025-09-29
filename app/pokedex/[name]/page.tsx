'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PokemonContext } from '@/context/PokemonContext';

function PokemonDetail() {
  const params = useParams();
  const name = params.name as string;

  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('PokemonDetail must be used within PokemonContextProvider');
  }

  const { pokemons } = context;
  const pokemon = pokemons.find(p => p.name.toLowerCase() === name?.toLowerCase());

  if (!pokemon) {
    return (
      <div className="container container--red">
        <div className="submenu">
          <Link href="/pokedex">{`< Back`}</Link>
        </div>
        <div>Pokemon not found</div>
      </div>
    );
  }

  return (
    <div className="container container--red">
      <div className="submenu">
        <Link href="/pokedex">{`< Back`}</Link>
      </div>
      <div className="detail__wrapper">
        <div className="detail">
          <div className="detail__card">
            <div
              className="detail__image"
              style={{ backgroundImage: `url(${pokemon.image})` }}
            />
          </div>
          <div className="table">
            <div className="table__row table__row--head">
              <div className="table__item">{pokemon.name}</div>
              <div className="table__item text-right">
                No.{pokemon.number}
              </div>
            </div>
            <div className="table__row">
              <div className="table__item">Status</div>
              <div className="table__item text-right">
                {pokemon.status === 'caught' ? 'Caught' : 'Wild'}
              </div>
            </div>
            <div className="table__row">
              <div className="table__item">MaxHP</div>
              <div className="table__item text-right">
                {pokemon.maxHP}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;