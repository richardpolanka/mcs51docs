"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
import { 
  Home, 
  LogOut, 
  Plus, 
  Cpu, 
  Code, 
  BookOpen, 
  Clock, 
  User, 
  LayoutDashboard,
  AlertCircle
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [addressingModes, setAddressingModes] = useState<AddressingMode[]>([]);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [codeExamples, setCodeExamples] = useState<CodeExample[]>([]);
  const [timing, setTiming] = useState<Timing[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("addressing-modes");
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);

  const router = useRouter();

  // Kontrola autentizace na začátku
  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('mcs51docs_admin_auth') === 'true';
      
      if (!isLoggedIn) {
        router.push('/login');
        return;
      }
      
      setIsAuthenticated(true);
    };
    
    checkAuth();
  }, [router]);

  // Načtení dat po úspěšné autentizaci
  useEffect(() => {
    if (isAuthenticated) {
      // Načtení dat
      const loadData = async () => {
        try {
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
        } catch (error) {
          console.error("Error loading data:", error);
          setNotification({
            type: 'error',
            message: 'Načítání dat selhalo. Zkuste obnovit stránku.'
          });
        } finally {
          setLoading(false);
        }
      };
      
      loadData();
    }
  }, [isAuthenticated]);

  // Pokud uživatel není autentizován, zobrazíme loading screen
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Načítání administrace...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('mcs51docs_admin_auth');
    document.cookie = "mcs51docs_admin_auth=; path=/; max-age=0"; // odstranění cookie
    router.push('/login');
  };

  const handleAddAddressingMode = async () => {
    try {
      const highestOrder = addressingModes.length > 0 
        ? Math.max(...addressingModes.map(m => m.order)) 
        : 0;
      
      const newModeData = {
        title: "Nový Adresový Mód",
        syntax: "PŘÍKLAD",
        description: "Popis adresového módu",
        example: "Příklad kódu",
        order: highestOrder + 1
      };
      
      const newMode = await createAddressingMode(newModeData);
      if (newMode) {
        setAddressingModes([...addressingModes, newMode]);
        setNotification({
          type: 'success',
          message: 'Nový adresový mód byl vytvořen'
        });
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (error) {
      console.error("Error adding addressing mode:", error);
      setNotification({
        type: 'error',
        message: 'Vytvoření adresového módu selhalo'
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleUpdateAddressingMode = async (id: string, data: Partial<AddressingMode>) => {
    try {
      const updatedMode = await updateAddressingMode(id, data);
      if (updatedMode) {
        setAddressingModes(addressingModes.map(mode => mode.id === id ? updatedMode : mode));
        setNotification({
          type: 'success',
          message: 'Adresový mód byl aktualizován'
        });
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (error) {
      console.error("Error updating addressing mode:", error);
      setNotification({
        type: 'error',
        message: 'Aktualizace adresového módu selhala'
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleDeleteAddressingMode = async (id: string) => {
    if (!confirm("Opravdu chcete smazat tento adresový mód?")) return;
    
    try {
      const success = await deleteAddressingMode(id);
      if (success) {
        setAddressingModes(addressingModes.filter(mode => mode.id !== id));
        setNotification({
          type: 'success',
          message: 'Adresový mód byl smazán'
        });
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (error) {
      console.error("Error deleting addressing mode:", error);
      setNotification({
        type: 'error',
        message: 'Smazání adresového módu selhalo'
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleAddPattern = async () => {
    try {
      const highestOrder = patterns.length > 0 
        ? Math.max(...patterns.map(p => p.order)) 
        : 0;
      
      const newPatternData = {
        title: "Nový Programovací Vzor",
        code: "    ; Příklad kódu",
        description: "Popis programovacího vzoru",
        order: highestOrder + 1
      };
      
      const newPattern = await createPattern(newPatternData);
      if (newPattern) {
        setPatterns([...patterns, newPattern]);
        setNotification({
          type: 'success',
          message: 'Nový programovací vzor byl vytvořen'
        });
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (error) {
      console.error("Error adding pattern:", error);
      setNotification({
        type: 'error',
        message: 'Vytvoření programovacího vzoru selhalo'
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleUpdatePattern = async (id: string, data: Partial<Pattern>) => {
    try {
      const updatedPattern = await updatePattern(id, data);
      if (updatedPattern) {
        setPatterns(patterns.map(pattern => pattern.id === id ? updatedPattern : pattern));
        setNotification({
          type: 'success',
          message: 'Programovací vzor byl aktualizován'
        });
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (error) {
      console.error("Error updating pattern:", error);
      setNotification({
        type: 'error',
        message: 'Aktualizace programovacího vzoru selhala'
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleDeletePattern = async (id: string) => {
    if (!confirm("Opravdu chcete smazat tento programovací vzor?")) return;
    
    try {
      const success = await deletePattern(id);
      if (success) {
        setPatterns(patterns.filter(pattern => pattern.id !== id));
        setNotification({
          type: 'success',
          message: 'Programovací vzor byl smazán'
        });
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (error) {
      console.error("Error deleting pattern:", error);
      setNotification({
        type: 'error',
        message: 'Smazání programovacího vzoru selhalo'
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleAddCodeExample = async () => {
    try {
      if (sections.length === 0) {
        setNotification({
          type: 'error',
          message: 'Nejsou k dispozici žádné sekce. Nejprve vytvořte sekci.'
        });
        setTimeout(() => setNotification(null), 3000);
        return;
      }
      
      const highestOrder = codeExamples.length > 0 
        ? Math.max(...codeExamples.map(e => e.order)) 
        : 0;
      
      const newExampleData = {
        title: "Nový Příklad Programu",
        code: "    ; Příklad kódu",
        description: "Popis příkladu programu",
        section_id: sections[0]?.id || "",
        order: highestOrder + 1
      };
      
      const newExample = await createCodeExample(newExampleData);
      if (newExample) {
        setCodeExamples([...codeExamples, newExample]);
        setNotification({
          type: 'success',
          message: 'Nový příklad programu byl vytvořen'
        });
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (error) {
      console.error("Error adding code example:", error);
      setNotification({
        type: 'error',
        message: 'Vytvoření příkladu programu selhalo'
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleUpdateCodeExample = async (id: string, data: Partial<CodeExample>) => {
    try {
      const updatedExample = await updateCodeExample(id, data);
      if (updatedExample) {
        setCodeExamples(codeExamples.map(example => example.id === id ? updatedExample : example));
        setNotification({
          type: 'success',
          message: 'Příklad programu byl aktualizován'
        });
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (error) {
      console.error("Error updating code example:", error);
      setNotification({
        type: 'error',
        message: 'Aktualizace příkladu programu selhala'
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleDeleteCodeExample = async (id: string) => {
    if (!confirm("Opravdu chcete smazat tento příklad programu?")) return;
    
    try {
      const success = await deleteCodeExample(id);
      if (success) {
        setCodeExamples(codeExamples.filter(example => example.id !== id));
        setNotification({
          type: 'success',
          message: 'Příklad programu byl smazán'
        });
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (error) {
      console.error("Error deleting code example:", error);
      setNotification({
        type: 'error',
        message: 'Smazání příkladu programu selhalo'
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Načítání administrace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold">MCS-51 Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>admin</span>
            </div>
            <Button onClick={() => router.push('/')} variant="ghost" size="sm" className="gap-1">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Zpět na web</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="gap-1"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Odhlásit se</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        {notification && (
          <div className="fixed top-4 right-4 z-50 max-w-md">
            <Alert 
              variant={notification.type === 'success' ? 'default' : 'destructive'}
              className={`
                mb-4 shadow-lg border-l-4 
                ${notification.type === 'success' ? 'bg-green-50 border-l-green-500' : 'bg-red-50 border-l-red-500'}
              `}
            >
              <div className="flex items-start gap-2">
                {notification.type === 'success' ? (
                  <div className="h-5 w-5 text-green-500 flex-shrink-0">✓</div>
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                )}
                <AlertDescription className={notification.type === 'success' ? 'text-green-700' : 'text-red-700'}>
                  {notification.message}
                </AlertDescription>
              </div>
            </Alert>
          </div>
        )}

        <Card className="mb-8 bg-white shadow-sm border border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle>Administrace Dokumentace MCS-51</CardTitle>
            <CardDescription>
              Správa obsahu dokumentace mikrokontroléru MCS-51
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500">
              Zde můžete spravovat veškerý obsah dokumentace - adresové módy, programovací vzory, příklady programů a informace o časování.
              Změny se okamžitě projeví na webu.
            </p>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 bg-white p-1 rounded-lg shadow-sm">
            <TabsTrigger value="addressing-modes" className="flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              Adresové Módy
            </TabsTrigger>
            <TabsTrigger value="patterns" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Programovací Vzory
            </TabsTrigger>
            <TabsTrigger value="examples" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Příklady Programů
            </TabsTrigger>
            <TabsTrigger value="timing" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Časování
            </TabsTrigger>
          </TabsList>

          <TabsContent value="addressing-modes" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">Adresové Módy</CardTitle>
                <Button onClick={handleAddAddressingMode} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Přidat Nový
                </Button>
              </CardHeader>
              <CardContent>
                {addressingModes.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <div className="mx-auto w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                      <Cpu className="h-12 w-12 text-slate-300" />
                    </div>
                    <p>Zatím nejsou k dispozici žádné adresové módy</p>
                    <Button 
                      variant="outline" 
                      onClick={handleAddAddressingMode} 
                      className="mt-4"
                    >
                      Vytvořit první
                    </Button>
                  </div>
                ) : (
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
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">Programovací Vzory</CardTitle>
                <Button onClick={handleAddPattern} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Přidat Nový
                </Button>
              </CardHeader>
              <CardContent>
                {patterns.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <div className="mx-auto w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                      <Code className="h-12 w-12 text-slate-300" />
                    </div>
                    <p>Zatím nejsou k dispozici žádné programovací vzory</p>
                    <Button 
                      variant="outline" 
                      onClick={handleAddPattern} 
                      className="mt-4"
                    >
                      Vytvořit první
                    </Button>
                  </div>
                ) : (
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
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">Příklady Programů</CardTitle>
                <Button onClick={handleAddCodeExample} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Přidat Nový
                </Button>
              </CardHeader>
              <CardContent>
                {codeExamples.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <div className="mx-auto w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                      <BookOpen className="h-12 w-12 text-slate-300" />
                    </div>
                    <p>Zatím nejsou k dispozici žádné příklady programů</p>
                    <Button 
                      variant="outline" 
                      onClick={handleAddCodeExample} 
                      className="mt-4"
                    >
                      Vytvořit první
                    </Button>
                  </div>
                ) : (
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
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timing" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">Správa Časování</CardTitle>
                <Button disabled className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Přidat Nové
                </Button>
              </CardHeader>
              <CardContent>
                <div className="p-6 border rounded-lg border-dashed border-slate-300 text-center">
                  <Clock className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">
                    Správa časování bude implementována později.
                  </p>
                  <p className="text-xs text-slate-400">
                    Tato funkce je aktuálně ve vývoji a bude k dispozici v příští aktualizaci. 
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}