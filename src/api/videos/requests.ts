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
    .get('videos/search', {
      searchParams: {
        query: params.search ?? 'new',
        page: params.page,
        per_page: 16,
        orientation: 'landscape',
      },
    })
    .json();

export const getVideoById = async (params: GetVideoByIdParams): Promise<GetVideoByIdResponse> =>
  await videosApi.authorized().get(`videos/videos/${params.videoId}`).json();
