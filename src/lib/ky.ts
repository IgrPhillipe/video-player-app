import ky, { BeforeRequestHook, KyInstance, Options } from 'ky';

import { VIDEOS_API_KEY, VIDEOS_API_URL } from '@/config';

const kyConfig = ky.create({
  prefixUrl: VIDEOS_API_URL,
  timeout: false,
  retry: 1,
} as Options);

const authorizedRequest: BeforeRequestHook = async (request) => {
  request.headers.set('Authorization', `Bearer ${VIDEOS_API_KEY}`);
};

type VideosApi = {
  authorized: () => KyInstance;
  unauthorized: () => KyInstance;
};

const videosApi: VideosApi = {
  authorized: (): KyInstance =>
    kyConfig.extend({
      hooks: {
        beforeRequest: [authorizedRequest],
      },
    }),
  unauthorized: (): KyInstance =>
    kyConfig.extend({
      hooks: {
        beforeRequest: [],
      },
    }),
};

export default videosApi;
