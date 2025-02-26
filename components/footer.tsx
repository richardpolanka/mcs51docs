import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-100 border-t py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold">MCS-51 Dokumentace</h2>
            <p className="text-sm text-muted-foreground">
              Kompletní dokumentace pro mikrokontroléry řady MCS-51
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} MCS-51 Documentation
            </p>
            <div className="flex gap-4 mt-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                Domů
              </Link>
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}