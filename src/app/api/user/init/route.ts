import { COLLECTION_NAME, DB_NAME, USER_COOKIE_NAME } from '@/config';
import clientPromise from '@/lib/mongodb';
import { User } from '@/types/user';
import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
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

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection<User>(COLLECTION_NAME);

    await collection.insertOne({
      _id: userId,
      autoplay: false,
      favoriteVideos: [],
      watchedVideos: [],
    });
  }

  return NextResponse.redirect(new URL('/', request.url));
}
