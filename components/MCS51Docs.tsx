"use client";

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddressingTab } from "./tabs/adressingTab";
import { PatternsTab } from "./tabs/patternsTab";
import { ExamplesTab } from "./tabs/examplesTab";
import { TimingTab } from "./tabs/timingTab";
import {
  getAddressingModes,
  getPatterns,
  getCodeExamples,
  getTiming,
  AddressingMode,
  Pattern,
  CodeExample,
  Timing
} from '@/lib/supabase';
import { Card } from './ui/card';

export function MCS51Docs() {
  const [addressingModes, setAddressingModes] = useState<AddressingMode[]>([]);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [codeExamples, setCodeExamples] = useState<CodeExample[]>([]);
  const [timing, setTiming] = useState<Timing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [addressingData, patternsData, examplesData, timingData] = await Promise.all([
          getAddressingModes(),
          getPatterns(),
          getCodeExamples(),
          getTiming(),
        ]);

        setAddressingModes(addressingData);
        setPatterns(patternsData);
        setCodeExamples(examplesData);
        setTiming(timingData);
      } catch (error) {
        console.error("Failed to fetch documentation data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Card className="p-8 text-center">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
        <p className="mt-4">Načítání dokumentace...</p>
      </Card>
    );
  }

  return (
    <Tabs defaultValue="addressing" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-8">
        <TabsTrigger value="addressing">Adresové Módy</TabsTrigger>
        <TabsTrigger value="patterns">Programovací Vzory</TabsTrigger>
        <TabsTrigger value="examples">Příklady Programů</TabsTrigger>
        <TabsTrigger value="timing">Časování</TabsTrigger>
      </TabsList>

      <TabsContent value="addressing">
        <AddressingTab addressingModes={addressingModes} />
      </TabsContent>

      <TabsContent value="patterns">
        <PatternsTab patterns={patterns} />
      </TabsContent>

      <TabsContent value="examples">
        <ExamplesTab codeExamples={codeExamples} />
      </TabsContent>

      <TabsContent value="timing">
        <TimingTab timing={timing} />
      </TabsContent>
    </Tabs>
  );
}

export default MCS51Docs;
