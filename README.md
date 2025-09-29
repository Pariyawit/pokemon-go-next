# Pokemon Go

Mini Pokémon Go based on Google April Fools' joke in 2014

A Next.js 15 web application with TypeScript that recreates the Pokemon Go experience in a browser. Catch Pokemon spawned at random world locations using an interactive Google Map!

## Features

- 🗺️ **Interactive World Map** - Explore a Google Maps interface with Pokemon spawned globally
- 🎯 **Pokemon Catching** - Click-based capture mechanics with distance calculations
- 👤 **Simple Authentication** - Name-based login with local storage persistence
- 📖 **Pokedex** - Collection view of caught Pokemon with detailed information
- 💾 **Local Storage** - Progress saved locally in your browser

## Requirements

- Node.js and npm
- Google Maps API key

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_MAP_KEY=your_google_maps_api_key_here
   ```

## Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Build

Build for production:
```bash
npm run build
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Technology Stack

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **React 18** with hooks and context
- **Google Maps API** via google-map-react
- **SCSS** for styling
- **localStorage** for data persistence
- **FontAwesome** for icons
