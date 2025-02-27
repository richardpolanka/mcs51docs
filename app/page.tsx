"use client";

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import MCS51Docs from '@/components/MCS51Docs';
import { Cpu, BookOpen, Code, Clock, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header />
      <div className="container mx-auto p-4 md:p-8">
        <div className="mb-8 max-w-3xl">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-800 bg-clip-text text-transparent">
            Dokumentace MCS-51
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            Kompletní průvodce architekturou a programováním mikrokontroléru MCS-51 s interaktivními příklady a detailními vysvětleními.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Button size="lg" className="gap-2" onClick={() => document.getElementById('docs-section')?.scrollIntoView({ behavior: 'smooth' })}>
              <BookOpen size={18} />
              Začít učení
              <ChevronRight size={16} />
            </Button>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="gap-2">
                <Cpu size={18} />
                Přístup do Dashboardu
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                Adresové Módy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Všechny způsoby adresování paměti a registrů v architektuře MCS-51 s příklady a detailním popisem.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Programovací Vzory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Osvědčené programovací postupy a vzory specifické pro MCS-51, které zefektivní vaši práci.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Příklady Programů
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Kompletní ukázkové programy s komentáři pro běžné úlohy a aplikace mikrokontroléru.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Časování
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Detailní informace o časování instrukcí a přerušení pro optimalizaci výkonu.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <section className="bg-white rounded-lg shadow-sm p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4">O MCS-51</h2>
          <p className="text-slate-600 mb-4">
            MCS-51 (také známý jako 8051) je jednočipový mikrokontrolér navržený společností Intel v roce 1980. Přestože se jedná o starší architekturu, dodnes se hojně používá v průmyslových aplikacích a vzdělávání díky své jednoduchosti, robustnosti a dostupnosti.
          </p>
          <p className="text-slate-600 mb-4">
            Tato dokumentace poskytuje komplexní pohled na programování MCS-51 včetně adresových módů, programovacích vzorů, příkladů programů a informací o časování instrukcí.
          </p>
        </section>

        <div className="mb-8" id="docs-section">
          <h2 className="text-2xl font-bold mb-4">Interaktivní dokumentace</h2>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <MCS51Docs />
          </div>
        </div>
      </div>
    </main>
  );
}