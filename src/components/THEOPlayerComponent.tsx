import React from 'react';
import { DefaultUI } from '@theoplayer/react-ui';
import type { SourceDescription } from 'theoplayer';

interface THEOPlayerComponentProps {
  source?: SourceDescription;
  className?: string;
  width?: string | number;
  height?: string | number;
}

const THEOPlayerComponent: React.FC<THEOPlayerComponentProps> = ({
  source,
  className = '',
  width = '100%',
  height = 400
}) => {
  const defaultSource: SourceDescription = {
    sources: [
      {
        src: 'https://cdn.theoplayer.com/video/elephants-dream/playlist.m3u8',
        type: 'application/x-mpegurl'
      }
    ],
    poster: 'https://cdn.theoplayer.com/video/elephants-dream/playlist.png'
  };

  return (
    <div className={`theoplayer-wrapper ${className}`}>
      <DefaultUI
        configuration={{
          libraryLocation: 'https://cdn.myth.theoplayer.com/6.12.1/',
          license: '' // You'll need to add your THEOplayer license here
        }}
        source={source || defaultSource}
        fluid={false}
        width={width}
        height={height}
      />
    </div>
  );
};

export default THEOPlayerComponent;
