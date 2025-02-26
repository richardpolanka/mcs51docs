"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { supabase } from '@/lib/supabase';

export function Header() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold">
          MCS-51 Docs
        </Link>
        <div>
          {!loading && (
            user ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard" passHref legacyBehavior>
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Button 
                  variant="outline"
                  onClick={async () => {
                    await supabase.auth.signOut();
                  }}
                >
                  Odhlásit se
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link href="/login" passHref legacyBehavior>
                  <Button variant="ghost" >Přihlásit</Button>
                </Link>
                <Link href="/register" passHref legacyBehavior>
                  <Button variant="outline" >Registrovat</Button>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </header>
  );
}