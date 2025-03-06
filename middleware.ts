import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Získání aktuální cesty
  const path = request.nextUrl.pathname;
  
  // Získání stavu přihlášení z cookies
  const isLoggedIn = request.cookies.get('mcs51docs_admin_auth')?.value === 'true';
  
  // Definování chráněných cest (vyžadují přihlášení)
  const isProtectedPath = path.startsWith('/dashboard');
  
  // Pokud je to chráněná cesta a uživatel není přihlášen, přesměrování na přihlášení
  if (isProtectedPath && !isLoggedIn) {
    const redirectUrl = new URL('/login', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Pokud je uživatel již přihlášen a snaží se dostat na přihlašovací stránku, přesměrovat na dashboard
  if (isLoggedIn && path === '/login') {
    const redirectUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

// Nastavení cest, na které se middleware vztahuje
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
  ],
};