'use server';

import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';

import { Video } from '@/api/videos';
import { COLLECTION_NAME, DB_NAME, DEFAULT_PER_PAGE, USER_COOKIE_NAME } from '@/config';
import clientPromise from '@/lib/mongodb';
import { User } from '@/types/user';
import { parseTitle } from '@/utils/parser';
import { PaginationParams } from '../common/types';
import { PaginatedResponse } from '../common/useInfiniteQueryApi';

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
    });
  }

  return userId;
};

export const addToWatched = async (video: Video): Promise<void> => {
  const userId = await getUserId();
  const collection = await getUserCollection();

  const isWatched = await isVideoWatched(video.id);

  if (!isWatched) {
    await collection.updateOne(
      { _id: userId },
      { $addToSet: { watchedVideos: video } },
      { upsert: true },
    );
  }
};

export const getWatchedVideos = async ({
  page,
  search,
  fromVideoId,
}: PaginationParams & { search?: string; fromVideoId?: number }): Promise<PaginatedResponse> => {
  const userId = await getUserId();
  const collection = await getUserCollection();

  const user = await collection.findOne({ _id: userId });
  let watchedVideos = user?.watchedVideos || [];

  if (fromVideoId) {
    const index = watchedVideos.findIndex((video) => video.id === fromVideoId);
    watchedVideos = watchedVideos.slice(index + 1);
  }

  const filteredVideos = watchedVideos.filter((video) => {
    if (!search) return true;

    const title = parseTitle(video.url);

    return title.toLowerCase().includes(search?.toLowerCase() || '');
  });

  const startIndex = (page - 1) * DEFAULT_PER_PAGE;
  const endIndex = startIndex + DEFAULT_PER_PAGE;

  return {
    videos: filteredVideos.slice(startIndex, endIndex),
    total_results: filteredVideos.length,
    page,
    per_page: DEFAULT_PER_PAGE,
  };
};

export const removeFromWatched = async (videoId: string): Promise<void> => {
  const userId = await getUserId();
  const collection = await getUserCollection();

  await collection.updateOne(
    { _id: userId },
    { $pull: { watchedVideos: { id: videoId as unknown as number } } },
  );
};

export const addToFavorites = async (video: Video): Promise<void> => {
  const userId = await getUserId();
  const collection = await getUserCollection();

  await collection.updateOne(
    { _id: userId },
    { $addToSet: { favoriteVideos: video } },
    { upsert: true },
  );
};

export const removeFromFavorites = async (videoId: string): Promise<void> => {
  const userId = await getUserId();
  const collection = await getUserCollection();

  await collection.updateOne(
    { _id: userId },
    { $pull: { favoriteVideos: { id: videoId as unknown as number } } },
  );
};

export const getFavoriteVideos = async ({
  page,
  search,
  fromVideoId,
}: PaginationParams & { search?: string; fromVideoId?: number }): Promise<PaginatedResponse> => {
  const userId = await getUserId();
  const collection = await getUserCollection();

  const user = await collection.findOne({ _id: userId });
  let favoriteVideos = user?.favoriteVideos || [];

  if (fromVideoId) {
    const index = favoriteVideos.findIndex((video) => video.id === fromVideoId);
    favoriteVideos = favoriteVideos.slice(index + 1);
  }

  const filteredVideos = favoriteVideos.filter((video) => {
    if (!search) return true;

    const title = parseTitle(video.url);

    return title.toLowerCase().includes(search?.toLowerCase() || '');
  });

  const startIndex = (page - 1) * DEFAULT_PER_PAGE;
  const endIndex = startIndex + DEFAULT_PER_PAGE;

  return {
    videos: filteredVideos.slice(startIndex, endIndex),
    total_results: filteredVideos.length,
    page,
    per_page: DEFAULT_PER_PAGE,
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
