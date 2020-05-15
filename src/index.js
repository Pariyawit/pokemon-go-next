import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider } from '@apollo/react-hooks';
import { PokemonContextProvider } from './context/PokemonContext';

import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://graphql-pokemon.now.sh/',
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <PokemonContextProvider>
      <App />
    </PokemonContextProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
