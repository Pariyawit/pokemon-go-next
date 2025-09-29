'use client';

import React from 'react';
import { PokemonContextProvider } from '@/context/PokemonContext';
import Header from '@/components/Header';
import '@/styles/globals.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Pokemon Go</title>
        <meta name="description" content="Mini Pokémon Go based on Google April Fools' joke in 2014" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <PokemonContextProvider>
          <Header />
          <main>{children}</main>
        </PokemonContextProvider>
      </body>
    </html>
  );
}