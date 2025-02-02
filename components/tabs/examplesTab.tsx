import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "../codeBlock";

export function ExamplesTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Příklady Programů</CardTitle>
      </CardHeader>
      <CardContent>
        <CodeBlock
          title="1. Výpočet CRC-8"
          code={`CRC8:
    MOV R0, #LENGTH     ; Délka dat
    MOV R1, #DATA       ; Adresa dat
    MOV B, #0           ; CRC registr
LOOP:
    MOV A, @R1          ; Načtení byte
    XRL A, B            ; XOR s CRC
    MOV R2, #8          ; 8 bitů
SHIFT:
    RLC A               ; Rotace vlevo přes carry
    JNC NEXT            ; Pokud není carry
    XRL A, #07h         ; XOR s polynomem
NEXT:
    DJNZ R2, SHIFT      ; Opakovat pro všechny bity
    MOV B, A            ; Uložení mezivýsledku
    INC R1              ; Další byte
    DJNZ R0, LOOP       ; Opakovat pro všechny byte
    MOV CRC, B          ; Uložení výsledku`}
          description="Implementace CRC-8 kontrolního součtu"
        />
        <CodeBlock
          title="2. Dekódování BCD"
          code={`BCD2BIN:
    MOV A, BCD         ; Načtení BCD čísla
    ANL A, #0F0h       ; Izolace vyššího nibble
    SWAP A             ; Prohození nibblů
    MOV B, #10         ; Násobitel
    MUL AB             ; Vynásobení 10
    MOV R1, A          ; Uložení mezivýsledku
    MOV A, BCD         ; Znovu načtení BCD
    ANL A, #0Fh        ; Izolace nižšího nibble
    ADD A, R1          ; Přičtení k mezivýsledku
    MOV BINARY, A      ; Uložení binárního výsledku`}
          description="Převod BCD na binární číslo"
        />
        <CodeBlock
          title="3. Výpočet průměru čísel"
          code={`AVERAGE:
    MOV R0, #DATA      ; Adresa pole čísel
    MOV R2, #LENGTH    ; Délka pole
    MOV B, R2          ; Uložení délky pro dělení
    MOV R1, #0         ; Součet
LOOP:
    MOV A, @R0         ; Načtení čísla
    ADD A, R1          ; Přičtení k součtu
    MOV R1, A          ; Uložení mezivýsledku
    INC R0             ; Další číslo
    DJNZ R2, LOOP      ; Opakovat pro všechna čísla
    
    DIV AB             ; Vydělení součtu počtem čísel
    MOV RESULT, A      ; Uložení výsledku`}
          description="Program pro výpočet aritmetického průměru čísel v paměti"
        />
        <CodeBlock
          title="4. Vyhledávání maxima"
          code={`FINDMAX:
    MOV R0, #DATA      ; Adresa pole čísel
    MOV R2, #LENGTH    ; Délka pole
    MOV A, @R0         ; První číslo jako maximum
    INC R0
    DEC R2
LOOP:
    MOV B, @R0         ; Načtení dalšího čísla
    CJNE A, B, COMPARE ; Porovnání s maximem
    SJMP NEXT
COMPARE:
    JNC NEXT           ; Pokud A >= B
    MOV A, B           ; Nové maximum
NEXT:
    INC R0             ; Další číslo
    DJNZ R2, LOOP      ; Opakovat pro všechna čísla
    MOV MAX, A         ; Uložení maxima`}
          description="Program pro nalezení největšího čísla v poli"
        />
      </CardContent>
    </Card>
  );
}