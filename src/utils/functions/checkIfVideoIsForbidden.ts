import { Video } from '@/api/videos';

export const checkIfVideoIsForbidden = (video: Video) => {
  if (!video || !video.privacy || typeof video.privacy.view !== 'string') {
    return false;
  }

  const viewPrivacy = video.privacy.view.toLowerCase();
  const forbiddenViews = ['password', 'ptv', 'users', 'disable'];
  if (forbiddenViews.includes(viewPrivacy)) {
    return true;
  }
  return false;
};
