'use client';

import React, { useState, useContext, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Pokemon from '@/components/Pokemon';
import Message from '@/components/Message';
import { PokemonContext } from '@/context/PokemonContext';

interface MapBounds {
  nw: { lat: number; lng: number };
  se: { lat: number; lng: number };
}

interface PokemonType {
  id: string;
  status: string;
  location: { lat: number; lng: number };
}

function createMapOptions(maps: any) {
  return {
    zoomControlOptions: {
      position: maps.ControlPosition.TOP_RIGHT,
      style: maps.ZoomControlStyle.SMALL,
    },
    fullscreenControl: false,
    minZoom: 2,
    maxZoom: 7,
    gestureHandling: 'greedy',
  };
}

function distance(nw: { lat: number; lng: number }, se: { lat: number; lng: number }, p: PokemonType) {
  const { min, abs, sqrt, pow } = Math;
  const min_lat = nw.lat;
  const max_lat = se.lat;
  const min_lng = se.lng;
  const max_lng = nw.lng;

  const lat = p.location.lat;
  const lng = p.location.lng;

  if (lat >= min_lat && lat <= max_lat) {
    return min(abs(min_lat - lat), abs(max_lat - lat));
  }
  if (lng >= min_lng && lng <= max_lng) {
    return min(abs(min_lng - lng), abs(max_lng - lng));
  }
  return min(
    sqrt(pow(lat - min_lat, 2) + pow(lng - min_lng, 2)),
    sqrt(pow(lat - max_lat, 2) + pow(lng - min_lng, 2)),
    sqrt(pow(lat - min_lat, 2) + pow(lng - max_lng, 2)),
    sqrt(pow(lat - max_lat, 2) + pow(lng - max_lng, 2))
  );
}

function closest_pokemon(pokemons: PokemonType[], nw: { lat: number; lng: number }, se: { lat: number; lng: number }) {
  const min_distance = pokemons
    .filter((p) => p.status === 'wild')
    .reduce((out, p) => {
      const d = distance(nw, se, p);
      if (d < out) return d;
      return out;
    }, 9999);
  return min_distance;
}

function scanArea(pokemons: PokemonType[], nw?: { lat: number; lng: number }, se?: { lat: number; lng: number }) {
  if (nw === undefined || se === undefined) return 0;
  let cnt = pokemons
    .filter((p) => p.status === 'wild')
    .reduce((total, p) => {
      if (
        p.status !== 'caught' &&
        p.location.lat >= se.lat &&
        p.location.lat <= nw.lat &&
        p.location.lng <= se.lng &&
        p.location.lng >= nw.lng
      ) {
        return total + 1;
      }
      return total;
    }, 0);
  return cnt;
}

function Map() {
  const MAP_KEY = process.env.NEXT_PUBLIC_MAP_KEY;
  const [status, setStatus] = useState('idle');
  const [count, setCount] = useState(0);
  const [distance, setDistance] = useState<number>();
  const [nw, setNW] = useState<{ lat: number; lng: number }>();
  const [se, setSE] = useState<{ lat: number; lng: number }>();
  const [loading, setLoading] = useState(true);

  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('Map must be used within PokemonContextProvider');
  }

  const {
    pokemons,
    zoom,
    setZoom,
    center,
    setCenter,
    pokeball,
    setPokeball,
    setBounds,
    setPokemonStatus,
  } = context;

  const handleChange = (e: any) => {
    setZoom(e.zoom);
    setCenter(e.center);
    setNW(e.bounds.nw);
    setSE(e.bounds.se);
    setCount(scanArea(pokemons, e.bounds.nw, e.bounds.se));
    setDistance(closest_pokemon(pokemons, e.bounds.nw, e.bounds.se));
    setPokeball(null);
    setBounds(e.bounds);
  };

  useEffect(() => {
    if (pokemons.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [pokemons]);

  useEffect(() => {
    setCount(scanArea(pokemons, nw, se));
  }, [pokemons, nw, se]);

  const pokemons_list = pokemons
    .filter((p) => p.status !== 'caught')
    .map((p) => {
      return (
        <Pokemon
          key={p.id}
          pokemon={p}
          lat={p.location.lat}
          lng={p.location.lng}
          zoom={zoom}
        />
      );
    });

  return (
    <div className="map">
      {loading ? (
        <div className="loading">
          <img src="/pokeball-spining.gif" alt="Loading" />
        </div>
      ) : (
        <>
          <GoogleMapReact
            bootstrapURLKeys={{ key: MAP_KEY || '' }}
            center={center}
            zoom={zoom}
            onChange={handleChange}
            options={createMapOptions}
            onZoomAnimationStart={() => setStatus('zooming')}
            onZoomAnimationEnd={() => setStatus('idle')}
          >
            {status === 'idle' && pokemons_list}
          </GoogleMapReact>
          <Message
            zoom={zoom}
            count={count}
            distance={distance}
            bounds={{ nw, se }}
            pokeball={pokeball}
            status={status}
          />
        </>
      )}
    </div>
  );
}

export default Map;