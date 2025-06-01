import { Video } from '@/api/videos';

export type User = {
  _id: string;
  favoriteVideos: Video[];
  watchedVideos: Video[];
};

export type UserCookie = {
  userId: string;
};
