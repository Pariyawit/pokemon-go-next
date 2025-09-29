# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Pokemon Go clone built as a Next.js 15 web application with TypeScript, inspired by Google's 2014 April Fools' joke. The app uses localStorage for data persistence and Google Maps API for map functionality.

## Commands

### Development
- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Deployment
- `npm run build` - Build for production deployment

## Architecture

The application uses Next.js 15 with the App Router and TypeScript:

### Directory Structure
- **app/**: Next.js App Router pages and layout
  - `layout.tsx` - Root layout with PokemonContextProvider
  - `page.tsx` - Home page (Map view)
  - `pokedex/` - Pokedex routes including dynamic `[name]` route
  - `user/` - User authentication page
- **src/**: Source code
  - `components/` - Reusable UI components (TypeScript)
  - `context/` - React Context for global state management (TypeScript)
  - `views/` - Page components (TypeScript)
  - `data/` - Static data files for Pokemon and location centroids
  - `lib/` - Firebase configuration and utilities
  - `styles/` - SCSS stylesheets

### Key Features
- **Map View**: Interactive Google Map with Pokemon spawned at random world locations
- **Pokemon Catching**: Click-based Pokemon capture mechanics with distance calculations
- **User Authentication**: Simple name-based authentication with localStorage persistence
- **Pokedex**: Collection view of caught Pokemon with dynamic routes
- **Local Storage**: User progress saved locally in browser storage

### State Management
The `PokemonContext` (TypeScript) manages:
- Pokemon collection with typed status (wild/caught)
- Map center, zoom, and bounds
- User authentication state with typed interfaces
- Game initialization and local data persistence

## Environment Setup

Create `.env.local` file with:
```
NEXT_PUBLIC_MAP_KEY=
```

## Technology Stack
- Next.js 15 with App Router
- TypeScript for type safety
- React 18 with hooks and context
- localStorage for data persistence
- Google Maps API via google-map-react
- SCSS for styling
- FontAwesome for icons

## Migration Notes
- Migrated from Create React App to Next.js 15
- Converted all JavaScript files to TypeScript
- Replaced React Router with Next.js App Router
- Updated environment variables to use NEXT_PUBLIC_ prefix
- Removed Firebase dependencies, replaced with localStorage
- Removed Apollo Client dependencies (not actively used)