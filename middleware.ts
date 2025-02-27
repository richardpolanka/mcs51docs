import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(request: NextRequest) {
  // Vytvoření Supabase klienta upraveného pro middleware
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });
  
  // Ověření session
  const { data: { session } } = await supabase.auth.getSession();
  
  // Získání aktuální cesty
  const path = request.nextUrl.pathname;
  
  // Definování chráněných cest (vyžadují přihlášení)
  const isProtectedPath = path.startsWith('/dashboard');
  
  // Veřejné cesty - přístup povolen
  const isPublicPath = 
    path === '/login' || 
    path === '/register' || 
    path === '/' || 
    path.startsWith('/api/auth');

  // Pokud je to chráněná cesta a není session, přesměrování na přihlášení
  if (isProtectedPath && !session) {
    const redirectUrl = new URL('/login', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Pokud je uživatel již přihlášen a snaží se dostat na přihlašovací stránku, přesměrovat na dashboard
  if (session && path === '/login') {
    const redirectUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

// Nastavení cest, na které se middleware vztahuje
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
  ],
};