import { PaginatedResponse } from '@/api/common/useInfiniteQueryApi';

export type VideoAuthor = {
  id: number;
  name: string;
  url: string;
};

export type VideoFile = {
  id: number;
  quality: 'hd' | 'sd' | string;
  file_type: 'video/mp4' | string;
  width: number;
  height: number;
  link: string;
};

export type VideoPicture = {
  id: number;
  picture: string;
  nr: number;
};

export type Video = {
  id: number;
  width: number;
  height: number;
  url: string;
  image: string;
  full_res: string | null;
  tags: string[];
  duration: number;
  user: VideoAuthor;
  video_files: VideoFile[];
  video_pictures: VideoPicture[];
};

export type GetVideosParams = {
  search?: string;
  videoId?: string;
};

export type GetVideosResponse = PaginatedResponse;

export type GetVideoByIdParams = {
  videoId: string;
};

export type GetVideoByIdResponse = Video;
