import videosApi from '@/lib/ky';
import {
  GetVideoByIdParams,
  GetVideoByIdResponse,
  GetVideosParams,
  GetVideosResponse,
} from './types';

export const getVideos = async (
  params: GetVideosParams & { page: number },
): Promise<GetVideosResponse> =>
  await videosApi
    .authorized()
    .get('videos', {
      searchParams: {
        ...(params.search ? { query: params.search } : { filter: 'trending' }),
        page: params.page,
        per_page: 16,
      },
    })
    .json();

export const getVideoById = async (params: GetVideoByIdParams): Promise<GetVideoByIdResponse> =>
  await videosApi.authorized().get(`videos/${params.videoId}`).json();

export const getRelatedVideos = async (
  params: GetVideosParams & { page: number },
): Promise<GetVideosResponse> =>
  await videosApi
    .authorized()
    .get(`videos/${params.videoId}/related`, {
      searchParams: {
        page: params.page,
        per_page: 16,
        filter: 'related',
      },
    })
    .json();
