'use server';

import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';

import { PaginatedResponse } from '@/api/common';
import { Video } from '@/api/videos';
import { COLLECTION_NAME, DB_NAME, USER_COOKIE_NAME } from '@/config';
import clientPromise from '@/lib/mongodb';
import { User } from '@/types/user';
import { getIdFromUri } from '@/utils/functions';

export const getUserCollection = async () => {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return db.collection<User>(COLLECTION_NAME);
};

export const getUserId = async (): Promise<string> => {
  const cookieStore = await cookies();
  let userId = cookieStore.get(USER_COOKIE_NAME)?.value;

  if (!userId) {
    userId = randomUUID();
    cookieStore.set(USER_COOKIE_NAME, userId, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 5,
    });

    const collection = await getUserCollection();
    await collection.insertOne({
      _id: userId,
      favoriteVideos: [],
      watchedVideos: [],
      autoplay: false,
    });
  }

  return userId;
};

export const addToWatched = async (video: Video): Promise<void> => {
  const userId = await getUserId();
  const collection = await getUserCollection();

  const videoId = getIdFromUri(video.uri);

  const isWatched = await isVideoWatched(videoId);

  if (!isWatched) {
    await collection.updateOne(
      { _id: userId },
      { $addToSet: { watchedVideos: { ...video, id: videoId } } },
      { upsert: true },
    );
  }
};

export const getWatchedVideos = async ({
  search,
}: {
  search?: string;
}): Promise<PaginatedResponse> => {
  const userId = await getUserId();
  const collection = await getUserCollection();

  const user = await collection.findOne({ _id: userId });
  const watchedVideos = user?.watchedVideos || [];

  const filteredVideos = watchedVideos.filter((video) => {
    if (!search) return true;

    const title = video.name;

    return title.toLowerCase().includes(search?.toLowerCase() || '');
  });

  return {
    data: filteredVideos,
    total: filteredVideos.length,
    page: 1,
    per_page: filteredVideos.length,
  };
};

export const removeFromWatched = async (videoId: number): Promise<void> => {
  const userId = await getUserId();
  const collection = await getUserCollection();

  await collection.updateOne({ _id: userId }, { $pull: { watchedVideos: { id: videoId } } });
};

export const addToFavorites = async (video: Video): Promise<void> => {
  const userId = await getUserId();
  const collection = await getUserCollection();

  const videoId = getIdFromUri(video.uri);

  await collection.updateOne(
    { _id: userId },
    { $addToSet: { favoriteVideos: { ...video, id: videoId } } },
    { upsert: true },
  );
};

export const removeFromFavorites = async (videoId: number): Promise<void> => {
  const userId = await getUserId();
  const collection = await getUserCollection();

  await collection.updateOne({ _id: userId }, { $pull: { favoriteVideos: { id: videoId } } });
};

export const getFavoriteVideos = async ({
  search,
}: {
  search?: string;
}): Promise<PaginatedResponse> => {
  const userId = await getUserId();
  const collection = await getUserCollection();

  const user = await collection.findOne({ _id: userId });
  const favoriteVideos = user?.favoriteVideos || [];

  const filteredVideos = favoriteVideos.filter((video) => {
    if (!search) return true;

    const title = video.name;

    return title.toLowerCase().includes(search?.toLowerCase() || '');
  });

  return {
    data: filteredVideos,
    total: filteredVideos.length,
    page: 1,
    per_page: filteredVideos.length,
  };
};

export const isVideoFavorite = async (videoId: number): Promise<boolean> => {
  const userId = await getUserId();
  const collection = await getUserCollection();

  const user = await collection.findOne({
    _id: userId,
    'favoriteVideos.id': videoId,
  });

  return !!user;
};

export const isVideoWatched = async (videoId: number): Promise<boolean> => {
  const userId = await getUserId();
  const collection = await getUserCollection();

  const user = await collection.findOne({
    _id: userId,
    'watchedVideos.id': videoId,
  });

  return !!user;
};

export const isAutoplayEnabled = async (): Promise<boolean> => {
  const userId = await getUserId();
  const collection = await getUserCollection();

  const user = await collection.findOne({ _id: userId });
  return user?.autoplay || false;
};

export const setAutoplayEnabled = async (enabled: boolean): Promise<void> => {
  const userId = await getUserId();
  const collection = await getUserCollection();

  await collection.updateOne({ _id: userId }, { $set: { autoplay: enabled } });
};
