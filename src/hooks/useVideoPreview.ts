import { VideoRef } from '@/types';
import { useCallback, useEffect, useRef, useState } from 'react';

type UseVideoPreviewReturn = {
  showVideo: boolean;
  videoRef: VideoRef;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleTouchStart: () => void;
  handleTouchEnd: () => void;
  internalDuration: number;
};

export const useVideoPreview = (videoUrl: string, duration: number): UseVideoPreviewReturn => {
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [internalDuration, setInternalDuration] = useState<number>(duration);

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isHoveredRef = useRef(false);
  const videoDurationRef = useRef<number>(duration);

  useEffect(() => {
    setInternalDuration(duration);
    videoDurationRef.current = duration;
  }, [duration]);

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;

    hoverTimeoutRef.current = setTimeout(() => {
      if (videoUrl && isHoveredRef.current) {
        setShowVideo(true);
      }
    }, 2000);
  }, [videoUrl]);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    setShowVideo(false);

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    setInternalDuration(videoDurationRef.current);
  }, []);

  const handleTouchStart = useCallback(() => {
    isHoveredRef.current = true;

    if (videoUrl) {
      setShowVideo(true);
    }
  }, [videoUrl]);

  const handleTouchEnd = useCallback(() => {
    isHoveredRef.current = false;
    setShowVideo(false);

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    setInternalDuration(videoDurationRef.current);
  }, []);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      const video = videoRef.current;
      video.play().catch(() => {
        console.log('Falha ao reproduzir o video');
      });
    }
  }, [showVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showVideo) return;

    const handleTimeUpdate = () => {
      if (videoDurationRef.current && !isNaN(videoDurationRef.current)) {
        const remainingTime = videoDurationRef.current - video.currentTime;
        const newDuration = Math.max(Math.floor(remainingTime), 0);
        setInternalDuration(newDuration);
      }
    };

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        videoDurationRef.current = video.duration;
        setInternalDuration(Math.floor(video.duration));
      }
    };

    const handleEnded = () => {
      setInternalDuration(0);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [showVideo]);

  return {
    showVideo,
    videoRef: videoRef as React.RefObject<HTMLVideoElement>,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchStart,
    handleTouchEnd,
    internalDuration,
  };
};
