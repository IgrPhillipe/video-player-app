import clientPromise from '@/lib/mongodb';
import { User } from '@/types/user';
import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const USER_COOKIE_NAME = 'user_id';
const DB_NAME = 'video_player_app';
const COLLECTION_NAME = 'users';

export async function GET(request: Request) {
  const cookieStore = await cookies();
  let userId = cookieStore.get(USER_COOKIE_NAME)?.value;

  if (!userId) {
    userId = randomUUID();
    cookieStore.set(USER_COOKIE_NAME, userId, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 5,
    });

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection<User>(COLLECTION_NAME);

    await collection.insertOne({
      _id: userId,
      favoriteVideos: [],
      watchedVideos: [],
    });
  }

  return NextResponse.redirect(new URL('/', request.url));
}
