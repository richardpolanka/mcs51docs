// src/components/mcs51/tabs/AddressingTab.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddressingMode } from "../adressingMode";

export function AddressingTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Adresové Módy MCS-51</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <AddressingMode
          title="1. Přímé Adresování"
          syntax="MOV A, 30h"
          description="Data jsou přímo na zadané adrese v interní RAM. Adresa je součástí instrukce."
          example={`MOV A, 30h    ; Načte byte z adresy 30h do A
MOV 40h, A    ; Uloží obsah A na adresu 40h
MOV 50h, #25h ; Uloží konstantu 25h na adresu 50h`}
        />
        
        <AddressingMode
          title="2. Registrové Adresování"
          syntax="MOV A, Rn"
          description="Práce s registry R0-R7 aktuální registrové banky. Rychlý přístup k často používaným datům."
          example={`MOV A, R0     ; Přesune obsah R0 do A
MOV R1, A     ; Přesune obsah A do R1
MOV R2, #55h  ; Nahraje hodnotu 55h do R2`}
        />
        
        <AddressingMode
          title="3. Nepřímé Adresování"
          syntax="MOV A, @Ri"
          description="Adresa je uložena v registru R0 nebo R1. Umožňuje dynamický přístup k paměti."
          example={`MOV R0, #30h  ; R0 obsahuje adresu
MOV A, @R0    ; Načte data z adresy v R0
MOV @R1, #44h ; Uloží hodnotu 44h na adresu v R1`}
        />

        <AddressingMode
          title="4. Indexové Adresování"
          syntax="MOVC A, @A+DPTR"
          description="Pro přístup do programové paměti. Adresa je součtem DPTR a akumulátoru."
          example={`MOV DPTR, #TABLE  ; Nastaví bázovou adresu
MOV A, #2        ; Index do tabulky
MOVC A, @A+DPTR  ; Načte hodnotu z (DPTR + A)
TABLE: DB 1,2,3,4 ; Data v programové paměti`}
        />

        <AddressingMode
          title="5. Bázové Adresování"
          syntax="MOV A, @DPTR"
          description="Používá 16-bitový registr DPTR jako bázovou adresu pro přístup do externí paměti."
          example={`MOV DPTR, #8000h  ; Nastaví adresu v externí RAM
MOVX A, @DPTR    ; Načte data z externí paměti
MOVX @DPTR, A    ; Zapíše data do externí paměti`}
        />

        <AddressingMode
          title="6. Bitové Adresování"
          syntax="SETB bit"
          description="Přímý přístup k jednotlivým bitům v bitově adresovatelné oblasti (20h-2Fh)."
          example={`SETB P1.0      ; Nastaví bit 0 portu P1
CLR 20h.3      ; Vynuluje bit 3 na adrese 20h
MOV C, P1.7    ; Přesune bit 7 portu P1 do carry`}
        />

        <AddressingMode
          title="7. Okamžité Adresování"
          syntax="MOV A, #data"
          description="Konstanta je součástí instrukce. Pro přímé nahrání hodnot."
          example={`MOV A, #55h    ; Nahraje 55h do A
MOV R0, #30h   ; Nahraje 30h do R0
MOV DPTR, #1234h ; Nahraje 16-bit konstantu do DPTR`}
        />

        <AddressingMode
          title="8. Kódové Adresování"
          syntax="MOVC A, @A+PC"
          description="Pro čtení dat z programové paměti relativně k programovému čítači."
          example={`MOV A, #3        ; Offset
MOVC A, @A+PC    ; Načte data PC+A
JMP NEXT         ; Skok
DB 10h,20h,30h   ; Data v kódové paměti
NEXT:`}
        />

        <AddressingMode
          title="9. Relativní Adresování"
          syntax="SJMP rel"
          description="Pro skoky relativní k aktuální pozici programového čítače (PC±127)."
          example={`    SJMP AHEAD     ; Relativní skok vpřed
    NOP           ; Žádná operace
AHEAD:            ; Cílová adresa
    MOV A, #0     ; Další instrukce`}
        />
      </CardContent>
    </Card>
  );
}