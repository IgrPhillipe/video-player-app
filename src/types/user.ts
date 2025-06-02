import { Video } from '@/api/videos';

export type User = {
  _id: string;
  favoriteVideos: Video[];
  watchedVideos: Video[];
  autoplay: boolean;
};

export type UserCookie = {
  userId: string;
};
