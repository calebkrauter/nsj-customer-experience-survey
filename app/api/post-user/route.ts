import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';
import { CookieKeys, CookieValues } from '../util';

export const dynamic = 'force-dynamic'
const passwords = [process.env.ADMIN_USER_PASSWORD, process.env.TEST_USER_PASSWORD, process.env.INTEGRATION_TEST_PASSWORD, process.env.EMPLOYEE_USER_PASSWORD]
export async function POST(request: Request) {
  const data = await request.json();
      const cookieStore = await cookies();
      for (const password of passwords) {
        const authenticated = (data.password === password )
        if (authenticated && data.password === process.env.EMPLOYEE_USER_PASSWORD) {
          cookieStore.set(CookieKeys.LOGGED_IN, CookieValues.EMPLOYEE, {maxAge: 30 * 24 * 60 * 60})
          return Response.json({authenticated: authenticated});
        } else if (authenticated && data.password === process.env.ADMIN_USER_PASSWORD) {
          cookieStore.set(CookieKeys.LOGGED_IN, CookieValues.ADMIN, {maxAge: 30 * 24 * 60})
          return Response.json({authenticated: authenticated});
        } else if (authenticated && data.password === process.env.INTEGRATION_TEST_PASSWORD) {
          cookieStore.set(CookieKeys.LOGGED_IN, CookieValues.INTEGRATION_TEST, {maxAge: 30 * 24 * 60})
          return Response.json({authenticated: authenticated});
        } else if (authenticated && data.password === process.env.TEST_USER_PASSWORD) {
          cookieStore.set(CookieKeys.LOGGED_IN, CookieValues.TEST_USER, {maxAge: 30 * 24 * 60})
          return Response.json({authenticated: authenticated});
        }
      }
  
  return NextResponse.json({authenticated: false})
}
