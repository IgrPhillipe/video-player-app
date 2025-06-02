import { PaginatedResponse } from '@/api/common/useInfiniteQueryApi';

export type Embed = {
  html: string;
};

export interface Privacy {
  view: string;
  embed: string;
  download: boolean;
  add: boolean;
  comments: string;
}

export type Size = {
  width: number;
  height: number;
  link: string;
  link_with_play_button: string;
};

export type Pictures = {
  uri: string;
  active: boolean;
  type: string;
  base_link: string;
  sizes: Size[];
  resource_key: string;
  default_picture: boolean;
};

export type Video = {
  uri: string;
  name: string;
  description: string;
  type: string;
  link: string;
  player_embed_url: string;
  duration: number;
  embed: Embed;
  pictures: Pictures;
  user: VimeoUser;
  width: number;
  height: number;
  privacy: Privacy;
};

export type VimeoUser = {
  name: string;
};

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

// export type Video = {
//   id: number;
//   width: number;
//   height: number;
//   url: string;
//   image: string;
//   full_res: string | null;
//   tags: string[];
//   duration: number;
//   user: VideoAuthor;
//   video_files: VideoFile[];
//   video_pictures: VideoPicture[];
// };

export type GetVideosParams = {
  search?: string;
  videoId?: number;
};

export type GetVideosResponse = PaginatedResponse;

export type GetVideoByIdParams = {
  videoId: number;
};

export type GetVideoByIdResponse = Video;

export type GetIsVideoFavoriteParams = {
  videoId: number;
};

export type GetIsVideoFavoriteResponse = boolean;

export type AddFavoriteParams = {
  video: Video;
};

export type AddFavoriteResponse = void;

export type RemoveFavoriteParams = {
  videoId: number;
};

export type RemoveFavoriteResponse = void;

export type AddWatchedParams = {
  video: Video;
};

export type AddWatchedResponse = void;

export type GetFavoritesParams = {
  userId: string;
  search?: string;
};

export type GetFavoritesResponse = PaginatedResponse;

export type GetWatchedParams = {
  userId: string;
  search?: string;
};

export type GetWatchedResponse = PaginatedResponse;

export type GetIsAutoplayEnabledParams = {
  userId: string;
};

export type GetIsAutoplayEnabledResponse = boolean;

export type EnableAutoplayParams = {
  userId: string;
  enabled: boolean;
};

export type EnableAutoplayResponse = void;
