"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push('/dashboard');
      }
    };
    
    checkSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // For demo purposes, use a fixed account
      const fixedEmail = "admin@mcs51docs.cz";
      const fixedPassword = "admin123";
      
      // If demo credentials are used, log in automatically
      if ((email === "demo" || email === fixedEmail) && (password === "demo" || password === fixedPassword)) {
        const { error } = await supabase.auth.signInWithPassword({
          email: fixedEmail,
          password: fixedPassword
        });
        
        if (error) throw error;
        router.push('/dashboard');
      } else {
        setError('Pro demonstrační přístup použijte "demo" jako přihlašovací údaje');
      }
    } catch (error: any) {
      setError(error.message || 'Přihlášení selhalo');
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
            Použijte demonstrační účet pro přihlášení
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4 flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-700">
              <p className="font-medium">Demonstrační přístup</p>
              <p>Pro přihlášení použijte:</p>
              <ul className="list-disc pl-5 mt-1">
                <li>Email: <strong>demo</strong></li>
                <li>Heslo: <strong>demo</strong></li>
              </ul>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="text" 
                placeholder="demo" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
        <CardFooter className="flex flex-col space-y-2 pt-0">
          <div className="text-center text-sm text-muted-foreground mt-2">
            Pro plnohodnotný přístup kontaktujte administrátora
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}