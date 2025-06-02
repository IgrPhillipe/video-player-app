import { Video } from '@/api/videos';

export type User = {
  _id: string;
  favoriteVideos: Array<Video & { id: number }>;
  watchedVideos: Array<Video & { id: number }>;
  autoplay: boolean;
};

export type UserCookie = {
  userId: string;
};
