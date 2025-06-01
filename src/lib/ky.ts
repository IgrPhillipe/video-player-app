import ky, { BeforeRequestHook, KyInstance } from 'ky';

import { VIDEOS_API_KEY, VIDEOS_API_URL } from '@/config';

const kyConfig = ky.create({
  prefixUrl: VIDEOS_API_URL,
  timeout: false,
  retry: 1,
});

const authorizedRequest: BeforeRequestHook = async (request) => {
  request.headers.set('Authorization', VIDEOS_API_KEY as string);
};

const videosApi = {
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
