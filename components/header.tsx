"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Cpu, User, LogIn, Menu, X } from 'lucide-react';

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Kontrola přihlášení z localStorage
    const checkAuth = () => {
      const auth = localStorage.getItem('mcs51docs_admin_auth') === 'true';
      setIsLoggedIn(auth);
      setLoading(false);
    };

    checkAuth();
    
    // Nastavení cookie při změně localStorage
    if (isLoggedIn) {
      document.cookie = "mcs51docs_admin_auth=true; path=/; max-age=86400"; // platnost 24 hodin
    }

    // Naslouchání na události localStorage
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isLoggedIn]);

  // Zavření mobilního menu při změně cesty
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('mcs51docs_admin_auth');
    document.cookie = "mcs51docs_admin_auth=; path=/; max-age=0"; // odstranění cookie
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo and title */}
          <Link href="/" className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-primary" />
            <span className="text-xl font-semibold">MCS-51 Docs</span>
          </Link>

          {/* User actions */}
          <div className="hidden md:flex items-center gap-2">
            {!loading && (
              isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span className="max-w-[120px] truncate">admin</span>
                  </div>
                  <Link href="/dashboard" passHref>
                    <Button variant="ghost" size="sm">Správa</Button>
                  </Link>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                  >
                    Odhlásit
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link href="/login" passHref>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <LogIn className="h-4 w-4" />
                      Přihlásit
                    </Button>
                  </Link>
                </div>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center justify-center h-9 w-9 rounded-md hover:bg-slate-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t mt-3">
            <nav className="flex flex-col gap-2">
              {!loading && (
                isLoggedIn ? (
                  <>
                    <div className="px-3 py-2 text-sm text-muted-foreground flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="truncate">admin</span>
                    </div>
                    <Link 
                      href="/dashboard" 
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100"
                    >
                      Správa
                    </Link>
                    <button
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 text-left w-full"
                      onClick={handleLogout}
                    >
                      Odhlásit
                    </button>
                  </>
                ) : (
                  <Link 
                    href="/login" 
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100"
                  >
                    <LogIn className="h-4 w-4" />
                    Přihlásit
                  </Link>
                )
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}