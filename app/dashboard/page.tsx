"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  getSections, 
  getAddressingModes, 
  getPatterns, 
  getCodeExamples, 
  getTiming, 
  Section, 
  AddressingMode, 
  Pattern, 
  CodeExample, 
  Timing,
  createAddressingMode,
  updateAddressingMode,
  deleteAddressingMode,
  createPattern,
  updatePattern,
  deletePattern,
  createCodeExample,
  updateCodeExample,
  deleteCodeExample,
  supabase
} from '@/lib/supabase';
import { EditAddressingModeForm } from '@/components/dashboard/EditAddressingModeForm';
import { EditPatternForm } from '@/components/dashboard/EditPatternForm';
import { EditCodeExampleForm } from '@/components/dashboard/EditCodeExampleForm';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState<Section[]>([]);
  const [addressingModes, setAddressingModes] = useState<AddressingMode[]>([]);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [codeExamples, setCodeExamples] = useState<CodeExample[]>([]);
  const [timing, setTiming] = useState<Timing[]>([]);
  const [activeTab, setActiveTab] = useState("addressing-modes");

  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push('/login');
        return;
      }
      
      setUser(data.session.user);
      
      // Load data
      const [sectionsData, addressingModesData, patternsData, codeExamplesData, timingData] = await Promise.all([
        getSections(),
        getAddressingModes(),
        getPatterns(),
        getCodeExamples(),
        getTiming()
      ]);
      
      setSections(sectionsData);
      setAddressingModes(addressingModesData);
      setPatterns(patternsData);
      setCodeExamples(codeExamplesData);
      setTiming(timingData);
      setLoading(false);
    };
    
    checkUser();
  }, [router]);

  const handleAddAddressingMode = async (data: Omit<AddressingMode, 'id'>) => {
    const newMode = await createAddressingMode(data);
    if (newMode) {
      setAddressingModes([...addressingModes, newMode]);
    }
  };

  const handleUpdateAddressingMode = async (id: string, data: Partial<AddressingMode>) => {
    const updatedMode = await updateAddressingMode(id, data);
    if (updatedMode) {
      setAddressingModes(addressingModes.map(mode => mode.id === id ? updatedMode : mode));
    }
  };

  const handleDeleteAddressingMode = async (id: string) => {
    const success = await deleteAddressingMode(id);
    if (success) {
      setAddressingModes(addressingModes.filter(mode => mode.id !== id));
    }
  };

  const handleAddPattern = async (data: Omit<Pattern, 'id'>) => {
    const newPattern = await createPattern(data);
    if (newPattern) {
      setPatterns([...patterns, newPattern]);
    }
  };

  const handleUpdatePattern = async (id: string, data: Partial<Pattern>) => {
    const updatedPattern = await updatePattern(id, data);
    if (updatedPattern) {
      setPatterns(patterns.map(pattern => pattern.id === id ? updatedPattern : pattern));
    }
  };

  const handleDeletePattern = async (id: string) => {
    const success = await deletePattern(id);
    if (success) {
      setPatterns(patterns.filter(pattern => pattern.id !== id));
    }
  };

  const handleAddCodeExample = async (data: Omit<CodeExample, 'id'>) => {
    const newExample = await createCodeExample(data);
    if (newExample) {
      setCodeExamples([...codeExamples, newExample]);
    }
  };

  const handleUpdateCodeExample = async (id: string, data: Partial<CodeExample>) => {
    const updatedExample = await updateCodeExample(id, data);
    if (updatedExample) {
      setCodeExamples(codeExamples.map(example => example.id === id ? updatedExample : example));
    }
  };

  const handleDeleteCodeExample = async (id: string) => {
    const success = await deleteCodeExample(id);
    if (success) {
      setCodeExamples(codeExamples.filter(example => example.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">MCS-51 Dashboard</h1>
        <div className="flex gap-4">
          <Button onClick={() => router.push('/')}>View Site</Button>
          <Button variant="outline" onClick={async () => {
            await supabase.auth.signOut();
            router.push('/login');
          }}>
            Logout
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="addressing-modes">Adresové Módy</TabsTrigger>
          <TabsTrigger value="patterns">Programovací Vzory</TabsTrigger>
          <TabsTrigger value="examples">Příklady Programů</TabsTrigger>
          <TabsTrigger value="timing">Časování</TabsTrigger>
        </TabsList>

        <TabsContent value="addressing-modes">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Správa Adresových Módů</span>
                <Button onClick={() => {
                  const highestOrder = addressingModes.length > 0 
                    ? Math.max(...addressingModes.map(m => m.order)) 
                    : 0;
                  handleAddAddressingMode({
                    title: "Nový Adresový Mód",
                    syntax: "PŘÍKLAD",
                    description: "Popis adresového módu",
                    example: "Příklad kódu",
                    order: highestOrder + 1
                  });
                }}>
                  Přidat Nový
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {addressingModes.map((mode) => (
                  <EditAddressingModeForm 
                    key={mode.id}
                    mode={mode}
                    onUpdate={(data) => handleUpdateAddressingMode(mode.id, data)}
                    onDelete={() => handleDeleteAddressingMode(mode.id)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Správa Programovacích Vzorů</span>
                <Button onClick={() => {
                  const highestOrder = patterns.length > 0 
                    ? Math.max(...patterns.map(p => p.order)) 
                    : 0;
                  handleAddPattern({
                    title: "Nový Programovací Vzor",
                    code: "    ; Příklad kódu",
                    description: "Popis programovacího vzoru",
                    order: highestOrder + 1
                  });
                }}>
                  Přidat Nový
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {patterns.map((pattern) => (
                  <EditPatternForm
                    key={pattern.id}
                    pattern={pattern}
                    onUpdate={(data) => handleUpdatePattern(pattern.id, data)}
                    onDelete={() => handleDeletePattern(pattern.id)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Správa Příkladů Programů</span>
                <Button onClick={() => {
                  const highestOrder = codeExamples.length > 0 
                    ? Math.max(...codeExamples.map(e => e.order)) 
                    : 0;
                  handleAddCodeExample({
                    title: "Nový Příklad Programu",
                    code: "    ; Příklad kódu",
                    description: "Popis příkladu programu",
                    section_id: sections[0]?.id || "",
                    order: highestOrder + 1
                  });
                }}>
                  Přidat Nový
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {codeExamples.map((example) => (
                  <EditCodeExampleForm
                    key={example.id}
                    example={example}
                    sections={sections}
                    onUpdate={(data) => handleUpdateCodeExample(example.id, data)}
                    onDelete={() => handleDeleteCodeExample(example.id)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timing">
          <Card>
            <CardHeader>
              <CardTitle>Správa Časování</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Obsah pro správu časování bude implementován později.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}