// src/components/mcs51/MCS51Docs.tsx
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddressingTab } from "./tabs/adressingTab";
import { PatternsTab } from "./tabs/patternsTab";
import { ExamplesTab } from "./tabs/examplesTab";
import { TimingTab } from "./tabs/timingTab";

export function MCS51Docs() {
  return (
    <Tabs defaultValue="addressing" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="addressing">Adresové Módy</TabsTrigger>
        <TabsTrigger value="patterns">Programovací Vzory</TabsTrigger>
        <TabsTrigger value="examples">Příklady Programů</TabsTrigger>
        <TabsTrigger value="timing">Časování</TabsTrigger>
      </TabsList>

      <TabsContent value="addressing">
        <AddressingTab />
      </TabsContent>

      <TabsContent value="patterns">
        <PatternsTab />
      </TabsContent>

      <TabsContent value="examples">
        <ExamplesTab />
      </TabsContent>

      <TabsContent value="timing">
        <TimingTab />
      </TabsContent>
    </Tabs>
  );
}

export default MCS51Docs;