"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Jednoduché ověření přihlašovacích údajů admin/admin
      if (username === 'admin' && password === 'admin') {
        // Uložení stavu přihlášení do localStorage
        localStorage.setItem('mcs51docs_admin_auth', 'true');
        
        // Přesměrování na dashboard
        router.push('/dashboard');
      } else {
        // Nesprávné přihlašovací údaje
        setError('Nesprávné uživatelské jméno nebo heslo');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setError('Přihlášení selhalo. Zkuste to znovu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Card className="w-full max-w-md shadow-lg border-t-4 border-t-primary">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">MCS-51 Admin</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => router.push('/')}>
              &larr; Zpět na hlavní stránku
            </Button>
          </div>
          <CardDescription>
            Přihlaste se do administrace systému
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Uživatelské jméno</Label>
              <Input 
                id="username" 
                type="text" 
                placeholder="admin" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="transition-all focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Heslo</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="transition-all focus:border-primary"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full transition-all bg-primary hover:bg-primary/90 font-medium" 
              disabled={loading}
            >
              {loading ? 'Přihlašování...' : 'Přihlásit se'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}