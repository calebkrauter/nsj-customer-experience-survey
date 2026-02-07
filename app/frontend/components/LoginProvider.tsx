import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import { LoginOverlay } from './LoginOverlay';

interface Props {
  children: ReactNode;
}
export async function LoginProvider({ children }: Props) {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get('logged_in');
  return (
    <div>
      {!isLoggedIn && <LoginOverlay />}
      {children}
    </div>
  );
}
