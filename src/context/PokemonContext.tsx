'use client';

import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { ref, set, get } from 'firebase/database';
import { database } from '@/lib/firebase';
import { centroidsData } from '@/data/centroidsData';
import { pokemonsData } from '@/data/pokemonsData';

interface Pokemon {
  id: string;
  number: string;
  name: string;
  image: string;
  maxHP: number;
  status: 'wild' | 'caught';
  location: {
    lat: number;
    lng: number;
  };
}

interface User {
  uid: string;
  photoURL: string;
  displayName: string;
}

interface PokemonContextType {
  pokemons: Pokemon[];
  zoom: number;
  setZoom: (zoom: number) => void;
  center: { lat: number; lng: number };
  setCenter: (center: { lat: number; lng: number }) => void;
  setPokemonStatus: (id: string, status: 'wild' | 'caught') => void;
  pokeball: any;
  setPokeball: (pokeball: any) => void;
  bounds: any;
  setBounds: (bounds: any) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  setPokemons: (pokemons: Pokemon[]) => void;
  initState: Pokemon[];
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

function writePokemonData(userId: string, pokemons: Pokemon[]) {
  const userRef = ref(database, 'users/' + userId);
  set(userRef, {
    pokemons: pokemons,
  });
}

interface PokemonContextProviderProps {
  children: ReactNode;
}

function PokemonContextProvider({ children }: PokemonContextProviderProps) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [initState, setInitState] = useState<Pokemon[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [pokeball, setPokeball] = useState<any>();
  const [bounds, setBounds] = useState<any>();
  const [center, setCenter] = useState({
    lat: 20,
    lng: 0,
  });
  const [zoom, setZoom] = useState(2);

  const loading = false;
  const error = false;
  const data = { pokemons: pokemonsData };

  let locations = [...centroidsData]; // Make a copy to avoid mutation

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && localStorage.getItem('user')) {
        setUser(JSON.parse(localStorage.getItem('user')!));
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const setPokemonStatus = (id: string, status: 'wild' | 'caught') => {
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
    if (user) {
      writePokemonData(user.uid, updatePokemons);
    }
  };

  const getRandomLocation = () => {
    const index = Math.floor(Math.random() * locations.length);
    const l = {
      lat: locations[index].LAT,
      lng: locations[index].LONG,
    };
    locations.splice(index, 1);
    return l;
  };

  // Initialize game
  useEffect(() => {
    if (data) {
      const updatePokemons = data.pokemons.map((p) => ({
        ...p,
        status: 'wild' as const,
        location: getRandomLocation(),
      }));
      setInitState(updatePokemons);

      if (user) {
        const userRef = ref(database, '/users/' + user.uid);
        get(userRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              setPokemons(snapshot.val().pokemons);
            } else {
              setPokemons(updatePokemons);
            }
          })
          .catch((err) => {
            console.log(err);
            setPokemons(updatePokemons);
          });
      } else {
        setPokemons(updatePokemons);
      }
    }
  }, [user]); // Add user as dependency

  const context: PokemonContextType = {
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
    user,
    setUser,
    setPokemons,
    initState,
  };

  return (
    <PokemonContext.Provider value={context}>
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemonContext() {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error('usePokemonContext must be used within a PokemonContextProvider');
  }
  return context;
}

export { PokemonContextProvider, PokemonContext };