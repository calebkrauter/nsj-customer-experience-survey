import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { db } from '../database/db';

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const data = await request.json();
      const result = await db.query(
        `SELECT password_hash FROM users`
      );
      const cookieStore = await cookies();
      for (const row of result.rows) {
        const authenticated = await bcrypt.compare(data.password, row.password_hash)
        console.log('password attempt: [', data.password, '], password stored: [', row.password_hash, '], authenticated: [', authenticated, ']')
        if (authenticated) {
          cookieStore.set('logged_in', 'true', {maxAge: 30 * 24 * 60 * 60})
          return Response.json({authenticated: authenticated});
        }
      }
  
  return NextResponse.json({authenticated: false})
}
