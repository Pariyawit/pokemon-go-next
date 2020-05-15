import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { PokemonContext } from '../context/PokemonContext';
import PokedexItem from '../components/PokedexItem';
import Detail from '../views/Detail';

function Pokedex() {
  const { pokemons } = useContext(PokemonContext);
  const list = pokemons.map((pokemon) => (
    <PokedexItem key={pokemon.id} pokemon={pokemon} />
  ));

  const catched = pokemons.reduce(
    (total, p) => (p.status == 'caught' ? total + 1 : total),
    0
  );

  return (
    <div className='container container--red'>
      <Switch>
        <Route exact path='/pokedex'>
          <div className='submenu submenu--space-between'>
            <div>Pokédex</div>
            <div className='number'>{`${catched}/${pokemons.length}`}</div>
          </div>
          <div className='pokedex grid'>{list}</div>
        </Route>
        <Route path='/pokedex/:name'>
          <Detail />
        </Route>
      </Switch>
    </div>
  );
}

export default Pokedex;
