import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "../codeBlock";

export function PatternsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Programovací Vzory</CardTitle>
      </CardHeader>
      <CardContent>
        <CodeBlock
          title="1. Zpracování Pole Dat"
          code={`    MOV R0, #30h      ; Počáteční adresa pole
    MOV R2, #10      ; Délka pole
LOOP:
    MOV A, @R0       ; Načtení prvku
    ADD A, #5        ; Zpracování (přičtení 5)
    MOV @R0, A       ; Uložení výsledku
    INC R0           ; Další prvek
    DJNZ R2, LOOP    ; Opakovat pro všechny prvky`}
          description="Vzor pro sekvenční zpracování dat v paměti"
        />
        <CodeBlock
          title="2. Tabulkové Vyhledávání"
          code={`    MOV DPTR, #TABLE  ; Adresa lookup tabulky
    MOVC A, @A+DPTR  ; A obsahuje index
    
TABLE:
    DB 00h,01h,03h,07h,0Fh,1Fh,3Fh,7Fh`}
          description="Vzor pro vyhledávání v konstantní tabulce"
        />
      </CardContent>
    </Card>
  );
}