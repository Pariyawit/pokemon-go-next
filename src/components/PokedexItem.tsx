'use client';

import React from 'react';
import Link from 'next/link';

interface PokedexItemProps {
  pokemon: {
    id: string;
    number: string;
    name: string;
    image: string;
    status: string;
  };
}

function PokedexItem({ pokemon }: PokedexItemProps) {
  const img_style = {
    backgroundImage: `url(${pokemon.image})`,
  };

  return (
    <>
      {pokemon.status === 'caught' ? (
        <div className="pokedex__item">
          <div className="pokedex__content">
            <Link href={`/pokedex/${pokemon.name}`}>
              <div className="pokedex__image" style={img_style}></div>
            </Link>
            <p className="pokedex__title">{pokemon.name}</p>
          </div>
        </div>
      ) : (
        <div className="pokedex__item pokedex__item--notfound">
          <p>{pokemon.number}</p>
        </div>
      )}
    </>
  );
}

export default PokedexItem;