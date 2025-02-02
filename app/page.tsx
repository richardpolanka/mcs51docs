// src/app/page.tsx
import MCS51Docs from '@/components/MCS51Docs';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="container mx-auto">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
          Dokumentace MCS-51
        </h1>
        <MCS51Docs />
      </div>
    </main>
  );
}