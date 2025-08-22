# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Development
```bash
# Start SSR development server (recommended for full-stack development)
npm run dev

# Start client-only development (Vite dev server, useful for debugging client-side issues)
npm run dev:client

# Install dependencies (use legacy peer deps flag to avoid THEOplayer peer dependency warnings)
npm install --legacy-peer-deps
```

### Build & Production
```bash
# Build complete application for production
npm run build

# Build client bundle only
npm run build:client

# Build server bundle only  
npm run build:server

# Preview production build locally
npm run preview

# Start production server
npm start
```

### Code Quality
```bash
# Run ESLint
npm run lint
```

## Architecture Overview

### SSR Architecture
This is a **Server-Side Rendered (SSR) React application** built with Vite. The SSR implementation uses a custom Express server that integrates with Vite's middleware in development mode.

**Key SSR Files:**
- `server.js` - Express server with Vite SSR middleware integration
- `src/entry-server.tsx` - Server-side rendering entry point using `renderToString`
- `src/entry-client.tsx` - Client-side hydration entry point using `hydrateRoot`
- `index.html` - HTML template with `<!--ssr-outlet-->` placeholder for SSR content

### Application Structure
- **Framework**: React 19 + TypeScript + Vite
- **Video Player**: THEOplayer with `@theoplayer/react-ui` components
- **SSR Implementation**: Custom Express server with Vite middleware
- **Build System**: Vite with dual-bundle setup (client + server)

### Key Configuration
- **Vite Config**: Configured with rollup input for both `index.html` and `src/entry-server.tsx`
- **SSR Externals**: THEOplayer packages (`@theoplayer/react-ui`, `theoplayer`) are marked as `noExternal` in Vite SSR config
- **TypeScript**: Project references setup with separate configs for app (`tsconfig.app.json`) and Node (`tsconfig.node.json`)

### THEOplayer Integration
The `THEOPlayerComponent` is the main video player component:
- Uses `@theoplayer/react-ui` DefaultUI component
- Configured with CDN library location and license key
- Default HLS stream from THEOplayer's demo content
- Accepts custom source, dimensions, and styling props

## Development Environment

### GitHub Codespaces Ready
The project includes `.devcontainer/devcontainer.json` configuration for one-click GitHub Codespaces deployment:
- Node.js 22 environment
- Auto-installs dependencies and starts dev server
- Port 5173 forwarding configured
- VS Code extensions for TypeScript, Prettier, and Tailwind

### Dependencies Installation
Always use `npm install --legacy-peer-deps` due to THEOplayer peer dependency requirements.

## Common Development Patterns

### Adding Video Sources
To use custom video sources, pass a `SourceDescription` object to `THEOPlayerComponent`:
```tsx
const customSource = {
  sources: [{ src: 'your-video.m3u8', type: 'application/x-mpegurl' }],
  poster: 'poster-image.jpg'
};
<THEOPlayerComponent source={customSource} />
```

### THEOplayer License
Production deployments require updating the license key in `src/components/THEOPlayerComponent.tsx`. The current license is for development/demo purposes.

### SSR Debugging
- Use `npm run dev:client` to run client-only mode if SSR issues occur
- Server entry point is minimal and only handles basic React rendering
- Client hydration happens automatically via `entry-client.tsx`

## Build Process

The build creates two separate bundles:
1. **Client bundle** (`dist/client/`) - Standard Vite client build
2. **Server bundle** (`dist/server/`) - SSR-specific server build

The dual-bundle approach allows the same React components to run on both server and client with appropriate entry points.
