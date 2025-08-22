# Vite + React + TypeScript + THEOplayer SSR

A Server-Side Rendered (SSR) React application built with Vite, TypeScript, and THEOplayer, optimized for GitHub Codespaces deployment.

## Features

- ⚡️ **Vite** - Fast build tool and dev server
- ⚛️ **React 19** - Latest React with TypeScript
- 🎥 **THEOplayer** - Professional video player with `@theoplayer/react-ui`
- 🔄 **Server-Side Rendering** - SEO-friendly and fast initial page loads
- 🚀 **GitHub Codespaces Ready** - One-click deployment and development
- 📱 **Responsive Design** - Works on desktop and mobile

## Quick Start

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173)

### GitHub Codespaces

1. Click the "Code" button on the GitHub repository
2. Select "Codespaces" tab
3. Click "Create codespace on main"
4. Wait for the environment to set up automatically
5. The development server will start automatically on port 5173

## Scripts

- `npm run dev` - Start SSR development server
- `npm run dev:client` - Start client-only development (Vite dev server)
- `npm run build` - Build for production (both client and server)
- `npm run build:client` - Build client bundle
- `npm run build:server` - Build server bundle
- `npm run preview` - Preview production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## THEOplayer Configuration

### License
To use THEOplayer in production, you'll need to add your license key in:
`src/components/THEOPlayerComponent.tsx`

```tsx
configuration={{
  libraryLocation: 'https://cdn.myth.theoplayer.com/6.12.1/',
  license: 'your-license-key-here'
}}
```

### Custom Video Sources
Update the component to use your own video sources:

```tsx
const customSource = {
  sources: [
    {
      src: 'your-video-url.m3u8',
      type: 'application/x-mpegurl'
    }
  ],
  poster: 'your-poster-image.jpg'
};

<THEOPlayerComponent source={customSource} />
```

## Project Structure

```
vite-theoplayer-ssr/
├── .devcontainer/          # GitHub Codespaces configuration
│   └── devcontainer.json
├── src/
│   ├── components/
│   │   └── THEOPlayerComponent.tsx  # THEOplayer React component
│   ├── entry-client.tsx    # Client-side entry point
│   ├── entry-server.tsx    # Server-side entry point
│   ├── App.tsx             # Main App component
│   └── main.tsx            # Original client entry (unused in SSR)
├── server.js               # Express SSR server
├── index.html              # HTML template with SSR outlet
├── vite.config.ts          # Vite configuration with SSR
└── package.json            # Dependencies and scripts
```

## Deployment

### GitHub Codespaces
The project is pre-configured for GitHub Codespaces. Simply create a new codespace and it will automatically:
- Install all dependencies
- Start the development server
- Forward port 5173 for external access

### Production Deployment
1. Build the project:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

## Troubleshooting

### Dependency Issues
If you encounter peer dependency warnings, install with:
```bash
npm install --legacy-peer-deps
```

### THEOplayer License
For production use, you must obtain a license from THEOplayer and add it to the configuration.

### SSR Issues
If you encounter SSR-related issues, you can run the client-only version:
```bash
npm run dev:client
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test in both development and production modes
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

**Note**: THEOplayer requires a separate license for commercial use.
