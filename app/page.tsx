import MCS51Docs from '@/components/MCS51Docs';
import { Header } from '@/components/header';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      <div className="container mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
            Dokumentace MCS-51
          </h1>
          <p className="text-xl text-muted-foreground">
            Kompletní průvodce architekturou a programováním mikrokontroléru MCS-51
          </p>
        </div>
        <MCS51Docs />
      </div>
    </main>
  );
}