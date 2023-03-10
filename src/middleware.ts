// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { IUser } from './interfaces/User';

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api/auth/register')) {
    const body = await req.json();
    const requiredFields = ['fullname', 'email', 'password'];

    for (const field of requiredFields) {
      if (!body[field]) {
        const url = req.nextUrl.clone();
        url.pathname = '/api/bad-request';
        url.search = `?message=${field} is a required field`;
        return NextResponse.rewrite(url);
      }
    }
  }

  return NextResponse.next();
}
