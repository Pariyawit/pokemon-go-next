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

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pokemon-go-next.vercel.app/" />
        <meta property="og:title" content="Pokemon Go" />
        <meta property="og:description" content="Mini Pokémon Go based on Google April Fools' joke in 2014" />
        <meta property="og:image" content="https://pokemon-go-next.vercel.app/social.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://pokemon-go-next.vercel.app/" />
        <meta property="twitter:title" content="Pokemon Go" />
        <meta property="twitter:description" content="Mini Pokémon Go based on Google April Fools' joke in 2014" />
        <meta property="twitter:image" content="https://pokemon-go-next.vercel.app/social.png" />
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