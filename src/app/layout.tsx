'use client';
//import type { Metadata } from "next";
import './../styles/globals.css';
import './../styles/fonts.css';
import './../styles/pa.css';
import { Providers } from './Providers';
import { AuthContext } from '@/hooks/AuthContext';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { LoadingSpinner } from '@/components/atoms';
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/toast';
import { PermisosProvider } from '@/hooks/PermisosContext';
/*
export const metadata: Metadata = {
    title: "CIMA",
    description: "CIMA Radiología San Jose",
};*/

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isSingInPage = usePathname() === '/auth/signin';

  return (
    <html lang='en'>
      <body suppressHydrationWarning={true}>
        <Providers>
          {isSingInPage ? (
            // Pagina sin auth
            children
          ) : (
            // Paginas con auth
            <PermisosProvider>
              <Auth>{children}</Auth>
            </PermisosProvider>
          )}
        </Providers>
      </body>
    </html>
  );
}

function Auth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { toast } = useToast();
  const { loginUser, isLoggedIn, errorMessage } = useContext(AuthContext);

  const { data: session, status } = useSession();
  const isUser = !!session?.user;

  useEffect(() => {
    if (status === 'loading') return;

    let email = session?.user?.email;
    let token = session?.user?.token;

    localStorage.setItem('token', token);

    if (email === null || email === undefined) email = '';
    if (token === null || token === undefined) token = '';

    loginUser(email, token).then((isLogged) => {
      if (!isLogged) {
        // Redirigir a la pantalla signin
        if (window.location.toString().endsWith('auth')) router.push('/signin');
        else router.push('/auth/signin');
      }
    });
  }, [isUser, status]);

  // Detectando si hay algun mensaje de error en el estado de autentificación de usuarios CIMA.
  useEffect(() => {
    if (errorMessage) {
      toast({
        title: 'No autentificado',
        message: errorMessage,
        icon: 'info',
        permanent: false
      });
    }
  }, [errorMessage]);

  if (isLoggedIn) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <LoadingSpinner />
    </div>
  );
}
