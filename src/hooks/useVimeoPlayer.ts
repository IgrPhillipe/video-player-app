'use client';

import Player from '@vimeo/player';
import { useCallback, useEffect, useMemo, useRef } from 'react';

type UseVimeoPlayerProps = {
  videoUri: string;
  onVideoEnd?: () => void;
  isAutoplayEnabled?: boolean;
  embedUrl: string;
};

export const useVimeoPlayer = ({
  videoUri,
  onVideoEnd,
  isAutoplayEnabled = false,
  embedUrl,
}: UseVimeoPlayerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<Player | null>(null);
  const isSettingUpRef = useRef(false);

  const isAutoplayEnabledRef = useRef(isAutoplayEnabled);
  const onVideoEndRef = useRef(onVideoEnd);

  useEffect(() => {
    isAutoplayEnabledRef.current = isAutoplayEnabled;
  }, [isAutoplayEnabled]);

  useEffect(() => {
    onVideoEndRef.current = onVideoEnd;
  }, [onVideoEnd]);

  const iframeUrl = useMemo(
    () =>
      `${embedUrl}?autoplay=1&controls=1&byline=1&portrait=0&title=false&speed=0&transparent=0&gesture=media&playsinline=1&keyboard=1&pip=1&dnt=1&outro=nothing&sharing=false`,
    [embedUrl],
  );

  const setupVimeoPlayer = useCallback(async () => {
    if (isSettingUpRef.current) {
      return;
    }

    if (!iframeRef.current) {
      return;
    }

    isSettingUpRef.current = true;

    try {
      if (playerRef.current) {
        playerRef.current.off('timeupdate');
      }

      const player = new Player(iframeRef.current);
      playerRef.current = player;

      player.on('timeupdate', (data) => {
        if (data.duration - data.seconds <= 0.5) {
          const currentAutoplayValue = isAutoplayEnabledRef.current;

          if (currentAutoplayValue) {
            player.pause();
            onVideoEndRef.current?.();
            return;
          }
          player.setCurrentTime(0);
          player.pause();
        }
      });

      await player.ready();
    } catch {
      console.warn('Erro ao configurar player Vimeo');
    } finally {
      isSettingUpRef.current = false;
    }
  }, []);

  const memoizedVideoUri = useMemo(() => videoUri, [videoUri]);

  useEffect(() => {
    const timer = setTimeout(setupVimeoPlayer, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [memoizedVideoUri, setupVimeoPlayer]);

  useEffect(
    () => () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    },
    [],
  );

  return {
    iframeRef,
    iframeUrl,
  };
};
