import Player from '@vimeo/player';
import { useEffect, useMemo, useRef } from 'react';

type UseVimeoPlayerProps = {
  videoUri: string;
  onVideoEnd?: () => void;
  autoplay?: boolean;
  embedUrl: string;
};

export const useVimeoPlayer = ({
  videoUri,
  onVideoEnd,
  autoplay = false,
  embedUrl,
}: UseVimeoPlayerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);

  const iframeUrl = useMemo(
    () =>
      `${embedUrl}?autoplay=1&controls=1&byline=1&portrait=0&title=false&speed=0&transparent=0&gesture=media&playsinline=1&keyboard=1&pip=1&dnt=1&outro=nothing&sharing=false`,
    [embedUrl],
  );

  useEffect(() => {
    const setupVimeoPlayer = async () => {
      if (!iframeRef.current) return;

      try {
        const player = new Player(iframeRef.current);
        playerRef.current = player;

        player.on('timeupdate', (data) => {
          if (data.duration - data.seconds <= 0.5) {
            if (autoplay) {
              player.pause();
              return onVideoEnd?.();
            }
            player.setCurrentTime(0);
            player.pause();
          }
        });
      } catch (error) {
        console.error('Erro ao configurar player Vimeo:', error);
      }
    };

    const timer = setTimeout(setupVimeoPlayer, 1000);

    return () => {
      clearTimeout(timer);
      if (playerRef.current) {
        playerRef.current.destroy?.();
      }
    };
  }, [videoUri, onVideoEnd, autoplay]);

  return {
    iframeRef,
    iframeUrl,
  };
};
