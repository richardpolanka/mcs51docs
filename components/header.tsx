"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { supabase } from '@/lib/supabase';
import { Cpu, BookOpen, Code, Clock, User, LogIn, Menu, X } from 'lucide-react';

export function Header() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setLoading(false);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { href: '/#addressing', icon: <Cpu className="h-4 w-4" />, label: 'Adresové Módy' },
    { href: '/#patterns', icon: <Code className="h-4 w-4" />, label: 'Programovací Vzory' },
    { href: '/#examples', icon: <BookOpen className="h-4 w-4" />, label: 'Příklady Programů' },
    { href: '/#timing', icon: <Clock className="h-4 w-4" />, label: 'Časování' }
  ];

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo and title */}
          <Link href="/" className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-primary" />
            <span className="text-xl font-semibold">MCS-51 Docs</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User actions */}
          <div className="hidden md:flex items-center gap-2">
            {!loading && (
              user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span className="max-w-[120px] truncate">{user.email}</span>
                  </div>
                  <Link href="/dashboard" passHref>
                    <Button variant="ghost" size="sm">Správa</Button>
                  </Link>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      await supabase.auth.signOut();
                    }}
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
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
              <div className="h-px bg-slate-200 my-2" />
              {!loading && (
                user ? (
                  <>
                    <div className="px-3 py-2 text-sm text-muted-foreground flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <Link 
                      href="/dashboard" 
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100"
                    >
                      Správa
                    </Link>
                    <button
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 text-left w-full"
                      onClick={async () => {
                        await supabase.auth.signOut();
                        setMobileMenuOpen(false);
                      }}
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