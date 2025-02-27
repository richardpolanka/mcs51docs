"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { Search, ChevronDown, ChevronUp } from "lucide-react";

export function MCS51Docs() {
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  
  const [addressingModes, setAddressingModes] = useState<AddressingMode[]>([]);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [codeExamples, setCodeExamples] = useState<CodeExample[]>([]);
  const [timing, setTiming] = useState<Timing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(
    tabFromUrl && ["addressing", "patterns", "examples", "timing"].includes(tabFromUrl) 
      ? tabFromUrl 
      : "addressing"
  );
  const [showIntro, setShowIntro] = useState(true);

  // Filtered data based on search query
  const filteredAddressingModes = addressingModes.filter(mode => 
    mode.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    mode.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mode.syntax.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredPatterns = patterns.filter(pattern => 
    pattern.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    pattern.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pattern.code.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredExamples = codeExamples.filter(example => 
    example.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (example.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
    example.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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

  // Listen for hash changes from the header buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const tabName = hash.substring(1); // Remove the # character
        if (["addressing", "patterns", "examples", "timing"].includes(tabName)) {
          setActiveTab(tabName);
        }
      }
    };

    // Check for hash on initial load
    handleHashChange();

    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const getResultsCount = () => {
    const addressingCount = filteredAddressingModes.length;
    const patternsCount = filteredPatterns.length;
    const examplesCount = filteredExamples.length;
    
    return {
      addressing: addressingCount,
      patterns: patternsCount,
      examples: examplesCount,
      total: addressingCount + patternsCount + examplesCount
    };
  };

  const resultsCount = getResultsCount();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Already searching in real-time, but this handles form submission
  };

  return (
    <div className="w-full">
      {loading ? (
        <Card className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
          <p className="text-muted-foreground">Načítání dokumentace...</p>
        </Card>
      ) : (
        <>
          {showIntro && (
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>O Architektuře MCS-51</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowIntro(false)}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>
                  Klíčové informace o mikrokontroléru 8051
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground space-y-3">
                  <p>
                    MCS-51 (často označovaný jako 8051) je rodina 8-bitových mikrokontrolérů, kterou vyvinula společnost Intel v roce 1980. 
                    Dodnes zůstává oblíbenou volbou díky své jednoduchosti, spolehlivosti a dostupnosti.
                  </p>
                  <p>
                    Mikrokontrolér obsahuje CPU, paměť RAM, paměť ROM/FLASH, vstupně-výstupní porty a další periférie jako časovače, 
                    čítače nebo sériové rozhraní, to vše na jednom čipu.
                  </p>
                  <p>
                    Základní vlastnosti MCS-51:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>8-bitový mikroprocesor</li>
                    <li>Harvardská architektura (oddělená programová a datová paměť)</li>
                    <li>256 bajtů interní RAM</li>
                    <li>4 kB programové paměti (ROM/FLASH)</li>
                    <li>4 vstupně-výstupní 8-bitové porty</li>
                    <li>2 časovače/čítače</li>
                    <li>Sériové rozhraní UART</li>
                    <li>Systém přerušení</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
          
          {!showIntro && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowIntro(true)}
              className="mb-4 flex items-center gap-2"
            >
              <ChevronDown className="h-4 w-4" />
              Zobrazit úvod o MCS-51
            </Button>
          )}

          <div className="mb-6">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Hledat v dokumentaci..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white"
              />
              {searchQuery && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0"
                    onClick={() => setSearchQuery("")}
                  >
                    ✕
                  </Button>
                </div>
              )}
            </form>
            
            {searchQuery && (
              <div className="mt-2 text-sm text-muted-foreground">
                {resultsCount.total === 0 ? (
                  <p>Nenalezeny žádné výsledky pro "{searchQuery}"</p>
                ) : (
                  <p>
                    Nalezeno {resultsCount.total} výsledků pro "{searchQuery}": 
                    {resultsCount.addressing > 0 && ` ${resultsCount.addressing} adresových módů`}
                    {resultsCount.patterns > 0 && `${resultsCount.addressing > 0 ? ',' : ''} ${resultsCount.patterns} programovacích vzorů`}
                    {resultsCount.examples > 0 && `${resultsCount.addressing > 0 || resultsCount.patterns > 0 ? ',' : ''} ${resultsCount.examples} příkladů programů`}
                  </p>
                )}
              </div>
            )}
          </div>

          <Tabs 
            defaultValue="addressing"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger 
                value="addressing"
                className="relative"
                id="addressing-tab"
              >
                Adresové Módy
                {searchQuery && resultsCount.addressing > 0 && (
                  <span className="absolute top-0 right-1 transform -translate-y-1/2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {resultsCount.addressing}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="patterns"
                className="relative"
                id="patterns-tab"
              >
                Programovací Vzory
                {searchQuery && resultsCount.patterns > 0 && (
                  <span className="absolute top-0 right-1 transform -translate-y-1/2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {resultsCount.patterns}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="examples"
                className="relative"
                id="examples-tab"
              >
                Příklady Programů
                {searchQuery && resultsCount.examples > 0 && (
                  <span className="absolute top-0 right-1 transform -translate-y-1/2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {resultsCount.examples}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="timing"
                id="timing-tab"
              >
                Časování
              </TabsTrigger>
            </TabsList>

            <TabsContent value="addressing" id="addressing">
              <AddressingTab addressingModes={filteredAddressingModes} />
            </TabsContent>

            <TabsContent value="patterns" id="patterns">
              <PatternsTab patterns={filteredPatterns} />
            </TabsContent>

            <TabsContent value="examples" id="examples">
              <ExamplesTab codeExamples={filteredExamples} />
            </TabsContent>

            <TabsContent value="timing" id="timing">
              <TimingTab timing={timing} />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}

export default MCS51Docs;